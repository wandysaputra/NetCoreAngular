import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IUser, IGroup } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { UserService } from "../services/index";

@Component({  
  templateUrl: "user.component.html",
  styleUrls: []
})
export class UserComponent implements OnInit {

    userForm: FormGroup;
    user: IUser;
    allGroups: IGroup[];
    selectedGroups: IGroup[];
    pageTitle: string = 'User';    
    errorMessage: string;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router:Router, private userService: UserService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            firstName: {
                required: 'First name is required.',
                minlength: 'First name must be at least three characters.',
                maxlength: 'First name cannot exceed 50 characters.'
            },
            lastName: {
                required: 'Last name is required.',
                minlength: 'Last name must be at least three characters.',
                maxlength: 'Last name cannot exceed 50 characters.'
            },
            userName: {
                required: 'User name is required.',
                minlength: 'User name must be at least three characters.',
                maxlength: 'User name cannot exceed 50 characters.',
                pattern: 'User name format not valid.'
            }
            //,password: {
            //    required: 'Password is required.',
            //    minlength: 'Password must be at least three characters.',
            //    maxlength: 'Password cannot exceed 50 characters.'
            //}
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void{
        this.userForm = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.minLength(3), Validators.maxLength(50)]],
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            password: [''],
            groupId:['']
        });
       
        //// Read the user Id from the route parameter
        //this.sub = this.route.params.subscribe(
        //    params => {
        //        let id = params['id'];
        //        this.getUser(id);
        //    }
        //);
        this.route.data.subscribe(data => {
            this.user = data['user'];
            this.allGroups = data['groups'];
            this.onUserRetrieved(this.user);
        });
    }

    onUserRetrieved(user: IUser): void {
        if (this.userForm) {
            this.userForm.reset();
        }
        this.user = user;

        if (!this.user || this.user.id === '') {
            this.pageTitle = 'Add User';
        } else {
            this.pageTitle = `Edit User: ${this.user.userName}`;
        }

        // Update the data on the form
        if (this.user) {
            this.userForm.patchValue({
                userName: this.user.userName,
                firstName: this.user.firstName,
                lastName: this.user.lastName
            });

            this.selectedGroups = [];
            if (this.user.groupIds) {
                this.selectedGroups = this.allGroups.filter(f => this.user.groupIds.indexOf(f.id) >= 0);
            }
        }
    }

    addGroup(): void {
        let groupId = this.userForm.get('groupId').value;
        let group = this.allGroups.find(f => f.id == groupId);

        if (!this.selectedGroups) {
            this.selectedGroups = [];
        }

        if (group && this.selectedGroups.findIndex(f => f.id == group.id) < 0) {
            this.selectedGroups.push(group);            
        }
    }

    removeGroup(group: IGroup): void {
        if (group) {
            var index = this.selectedGroups.findIndex(f => f.id == group.id);
            if (index >= 0) {
                this.selectedGroups.splice(index, 1);
            }            
        }
    }


    deleteUser(): void {
        if (this.user.id === '') {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the user: ${this.user.userName}?`)) {
                this.userService.deleteUser(this.user.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveUser(): void {
        if (this.userForm.dirty && this.userForm.valid) {
            // Copy the form values over the user object values
            let p = Object.assign({}, this.user, this.userForm.value);
            p.groupIds = this.selectedGroups.map(({ id }) => id);

            this.userService.saveUser(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.userForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.userForm.reset();
        this.router.navigate(['/userManagement/users']);
    }
    
    
}