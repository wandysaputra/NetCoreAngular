import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IProvince } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { ProvinceService } from "../services/index";

@Component({
    templateUrl: "province.component.html",
    styleUrls: []
})
export class ProvinceComponent implements OnInit, AfterViewInit {

    provinceForm: FormGroup;
    province: IProvince;  
    pageTitle: string = 'Province';
    errorMessage: string;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private provinceService: ProvinceService) {
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
            }            
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.provinceForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.province = data['province'];
            this.onProvinceRetrieved(this.province);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.provinceForm.valueChanges).debounceTime(800).subscribe(value => {
        this.provinceForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.provinceForm);
        });
    }

    onProvinceRetrieved(province: IProvince): void {
        if (this.provinceForm) {
            this.provinceForm.reset();
        }
        this.province = province;

        if (!this.province || !this.province.id || this.province.id === 0) {
            this.pageTitle = 'Add Province';
        } else {
            this.pageTitle = `Edit Province: ${this.province.name}`;
        }

        // Update the data on the form
        if (this.province) {
            this.provinceForm.patchValue({
                code: this.province.code || '',
                name: this.province.name || '',
                isActive: this.province.isActive || false
            });
        }
    }
    
    deleteProvince(): void {
        if (this.province.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the province: ${this.province.name}?`)) {
                this.provinceService.deleteProvince(this.province.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProvince(): void {
        if (this.provinceForm.valid) {
            // Copy the form values over the province object values
            let p = Object.assign({}, this.province, this.provinceForm.value);
            
            this.provinceService.saveProvince(p)
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
        this.provinceForm.reset();
        this.router.navigate(['/master/provinces']);
    }


}