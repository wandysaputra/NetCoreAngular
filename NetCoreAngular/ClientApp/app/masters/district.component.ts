import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IDistrict, IProvince, IRegency } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { DistrictService } from "../services/index";

@Component({
    templateUrl: "district.component.html",
    styleUrls: []
})
export class DistrictComponent implements OnInit, AfterViewInit {
    
    pageTitle: string = 'District';
    errorMessage: string;
    districtForm: FormGroup;
    district: IDistrict;  
    provinces: IProvince[];
    regencies: IRegency[];
    allRegencies: IRegency[];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private districtService: DistrictService) {
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
            },
            regencyId: {
                required: 'Regency is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.districtForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            provinceId: ['', [Validators.required]],
            regencyId: ['', [Validators.required]],
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.district = data['district'];
            this.provinces = data['provinces'];
            this.allRegencies = data['regencies'];

            this.onDistrictRetrieved(this.district);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.districtForm.valueChanges).debounceTime(800).subscribe(value => {
        this.districtForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.districtForm);
        });
    }

    onDistrictRetrieved(district: IDistrict): void {
        if (this.districtForm) {
            this.districtForm.reset();
        }
        this.district = district;

        if (!this.district || !this.district.id || this.district.id === 0) {
            this.pageTitle = 'Add District';
        } else {
            this.pageTitle = `Edit District: ${this.district.name}`;
        }

        // Update the data on the form
        if (this.district) {
            let regency = this.allRegencies.filter(f => f.id == this.district.regencyId)[0];
            let provinceId = 0;
            let regencyId = 0;
            if (regency) {
                this.regencies = this.allRegencies.filter(f => f.provinceId == regency.provinceId);
                provinceId = regency.provinceId;
                regencyId = regency.id;
            }

            this.districtForm.patchValue({
                code: this.district.code || '',
                name: this.district.name || '',
                provinceId: provinceId ||'',
                regencyId: regencyId ||'',
                isActive: this.district.isActive || false
            });
        }
    }

    onProvinceChanged(): void {
        let provinceId = this.districtForm.get('provinceId').value;
        this.regencies = this.allRegencies.filter(f => f.provinceId == provinceId);
    }

    deleteDistrict(): void {
        if (this.district.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the district: ${this.district.name}?`)) {
                this.districtService.deleteDistrict(this.district.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveDistrict(): void {
        if (this.districtForm.valid) {
            // Copy the form values over the district object values
            let p = Object.assign({}, this.district, this.districtForm.value);
            
            this.districtService.saveDistrict(p)
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
        this.districtForm.reset();
        this.router.navigate(['/master/districts']);
    }


}