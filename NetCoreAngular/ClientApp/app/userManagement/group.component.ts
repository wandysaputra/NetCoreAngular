import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IGroup, IMenu } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { GroupService } from "../services/index";

@Component({
    templateUrl: "group.component.html",
    styleUrls: []
})
export class GroupComponent implements OnInit, AfterViewInit {

    groupForm: FormGroup;
    group: IGroup;
    allMenus: IMenu[];
    selectedMenus: IMenu[];
    pageTitle: string = 'Group';
    private sub: Subscription;
    errorMessage: string;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private groupService: GroupService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Name is required.',
                minlength: 'Name must be at least three characters.',
                maxlength: 'Name cannot exceed 50 characters.'
            },
            description: {
                required: 'Description is required.',
                minlength: 'Description must be at least three characters.',
                maxlength: 'Description cannot exceed 50 characters.'
            }            
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.groupForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            isActive: [''],
            menuId:['']
        });

        this.route.data.subscribe(data => {            
            this.group = data['group'];
            this.allMenus = data['menus'];
            this.onGroupRetrieved(this.group);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.groupForm.valueChanges).debounceTime(800).subscribe(value => {
        this.groupForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.groupForm);
        });
    }

    onGroupRetrieved(group: IGroup): void {
        if (this.groupForm) {
            this.groupForm.reset();
        }
        this.group = group;

        if (!this.group || !this.group.id || this.group.id === 0) {
            this.pageTitle = 'Add Group';
        } else {
            this.pageTitle = `Edit Group: ${this.group.name}`;
        }

        // Update the data on the form
        if (this.group) {
            this.groupForm.patchValue({
                name: this.group.name || '',
                description: this.group.description || '',
                isActive: this.group.isActive || false
            });

            this.selectedMenus = [];
            if (this.group.menuIds) {
                this.selectedMenus = this.allMenus.filter(f => this.group.menuIds.indexOf(f.id) >= 0);
            }
        }
    }

    addMenu(): void {
        let menuId = this.groupForm.get('menuId').value;
        let menu = this.allMenus.find(f => f.id == menuId);
        if (!this.selectedMenus) {
            this.selectedMenus = [];
        }
        if (menu && this.selectedMenus.findIndex(f => f.id == menu.id) < 0) {
            this.selectedMenus.push(menu);
            let childMenus = this.allMenus.filter(f => f.parentMenuId == menu.id);
            
            if (childMenus && childMenus.length > 0) {
                for (let c of childMenus) {
                    let index = this.selectedMenus.findIndex(f => f.id == c.id);
                    if (index < 0) {
                        this.selectedMenus.push(c);
                    }
                }                
            }
        }
    }

    removeMenu(menu: IMenu): void {

        if (menu) {
            var index = this.selectedMenus.findIndex(f => f.id == menu.id);
            if (index >= 0) {
                this.selectedMenus.splice(index, 1);
            }

            let childMenus = this.selectedMenus.filter(f => f.parentMenuId == menu.id);
            if (childMenus && childMenus.length > 0) {
                for (let c of childMenus) {
                    index = this.selectedMenus.findIndex(f => f.id == c.id);
                    if (index >= 0) {
                        this.selectedMenus.splice(index, 1);
                    }
                }
            }
        }
    }

    deleteGroup(): void {
        if (this.group.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the group: ${this.group.name}?`)) {
                this.groupService.deleteGroup(this.group.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveGroup(): void {
        if (this.groupForm.valid) {
            // Copy the form values over the group object values
            let p = Object.assign({}, this.group, this.groupForm.value);
            p.menuIds = this.selectedMenus.map(({ id }) => id);

            this.groupService.saveGroup(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else  {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.groupForm.reset();
        this.router.navigate(['/userManagement/groups']);
    }


}