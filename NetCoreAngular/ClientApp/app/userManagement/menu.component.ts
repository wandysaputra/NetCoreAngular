import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMenu } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { MenuService } from "../services";

@Component({
    templateUrl: "menu.component.html",
    styleUrls: []
})
export class MenuComponent implements OnInit, AfterViewInit {

    menuForm: FormGroup;
    menu: IMenu;
    parentMenus: IMenu[];
    pageTitle: string = 'Menu';
    errorMessage: string;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private menuService: MenuService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            code: {
                required: 'Code is required.',
                minlength: 'Code must be at least three characters.',
                maxlength: 'Code cannot exceed 50 characters.'
            },
            title: {
                required: 'Title is required.',
                minlength: 'Title must be at least three characters.',
                maxlength: 'Title cannot exceed 50 characters.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.menuForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            url: [''],
            icon: [''],
            parentMenuId: [0],
            isActive: [true]
        });

        this.menuService.getMenus()
            .subscribe(menus => this.parentMenus = menus,
            error => this.errorMessage = <any>error);
        
        this.route.data.subscribe(data => {
            this.menu = data['menu'];
            this.onMenuRetrieved(this.menu);
        });
    }

    ngAfterViewInit(): void {
        this.menuForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.menuForm);
        });
    }

    getMenu(id: number): void {
        this.menuService.getMenu(id)
            .subscribe(
            (menu: IMenu) => this.onMenuRetrieved(menu),
            (error: any) => this.errorMessage = <any>error
            );
    }

    onMenuRetrieved(menu: IMenu): void {
        if (this.menuForm) {
            this.menuForm.reset();
        }
        
        this.menu = menu;

        if (!this.menu || !this.menu.id || this.menu.id === 0) {
            this.pageTitle = 'Add Menu';
        } else {
            this.pageTitle = `Edit Menu: ${this.menu.code}-${this.menu.title}`;
        }

        // Update the data on the form
        if (this.menu) {
            this.menuForm.patchValue({
                code: this.menu.code,
                title: this.menu.title,
                url: this.menu.url,
                icon: this.menu.icon,
                parentMenuId: this.menu.parentMenuId,
                isActive: this.menu.isActive || false
            });
        }
    }

    deleteMenu(): void {
        if (this.menu.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the menu: ${this.menu.title}?`)) {
                this.menuService.deleteMenu(this.menu.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveMenu(): void {
        if (this.menuForm.dirty && this.menuForm.valid) {
            // Copy the form values over the menu object values
            let p = Object.assign({}, this.menu, this.menuForm.value);

            this.menuService.saveMenu(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.menuForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.menuForm.reset();
        this.router.navigate(['/userManagement/menus']);
    }


}