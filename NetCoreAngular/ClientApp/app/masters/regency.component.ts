import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IRegency, IProvince } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { RegencyService } from "../services/index";

@Component({
    templateUrl: "regency.component.html",
    styleUrls: []
})
export class RegencyComponent implements OnInit, AfterViewInit {
    
    pageTitle: string = 'Regency';
    errorMessage: string;
    regencyForm: FormGroup;
    regency: IRegency;  
    provinces: IProvince[];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private regencyService: RegencyService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            code: {
                required: 'Code is required.',
                minlength: 'Code must be at least two characters.',
                maxlength: 'Code cannot exceed 10 characters.'
            },
            name: {
                required: 'Name is required.',
                minlength: 'Name must be at least three characters.',
                maxlength: 'Name cannot exceed 50 characters.'
            },
            provinceId: {
                required: 'Province is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.regencyForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            provinceId: ['', [Validators.required]],
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.regency = data['regency'];
            this.provinces = data['provinces'];
            this.onRegencyRetrieved(this.regency);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.regencyForm.valueChanges).debounceTime(800).subscribe(value => {
        this.regencyForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.regencyForm);
        });
    }

    onRegencyRetrieved(regency: IRegency): void {
        if (this.regencyForm) {
            this.regencyForm.reset();
        }
        this.regency = regency;

        if (!this.regency || !this.regency.id || this.regency.id === 0) {
            this.pageTitle = 'Add Regency';
        } else {
            this.pageTitle = `Edit Regency: ${this.regency.name}`;
        }

        // Update the data on the form
        if (this.regency) {
            this.regencyForm.patchValue({
                code: this.regency.code || '',
                name: this.regency.name || '',
                provinceId: this.regency.provinceId,
                isActive: this.regency.isActive || false
            });
        }
    }
    
    deleteRegency(): void {
        if (this.regency.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the regency: ${this.regency.name}?`)) {
                this.regencyService.deleteRegency(this.regency.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveRegency(): void {
        if (this.regencyForm.valid) {
            // Copy the form values over the regency object values
            let p = Object.assign({}, this.regency, this.regencyForm.value);
            
            this.regencyService.saveRegency(p)
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
        this.regencyForm.reset();
        this.router.navigate(['/master/regencies']);
    }


}