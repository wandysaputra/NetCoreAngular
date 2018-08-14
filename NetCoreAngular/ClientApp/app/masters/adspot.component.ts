import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IAdspot, IProvince, IRegency, IDistrict, IVillage } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { AdspotService } from "../services/index";

@Component({
    templateUrl: "adspot.component.html",
    styleUrls: []
})
export class AdspotComponent implements OnInit, AfterViewInit {
    
    pageTitle: string = 'Adspot';
    errorMessage: string;
    adspotForm: FormGroup;
    adspot: IAdspot;  
    provinces: IProvince[];
    regencies: IRegency[];
    allRegencies: IRegency[];
    districts: IDistrict[];
    allDistricts: IDistrict[];
    villages: IVillage[];
    allVillages: IVillage[];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private adspotService: AdspotService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {          
            name: {
                required: 'Name is required.',
                minlength: 'Name must be at least three characters.',
                maxlength: 'Name cannot exceed 50 characters.'
            }
            , street: {
                required: 'Street is required.',
                minlength: 'Street must be at least 10 characters.',
                maxlength: 'Street cannot exceed 5000 characters.'
            }
            , provinceId: {
                required: 'Province is required.'
            }
            , regencyId: {
                required: 'Regency is required.'
            }
            , districtId: {
                required: 'District is required.'
            }
            , villageId: {
                required: 'Village is required.'
            }
            , postcode: {
                required: 'Postcode is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.adspotForm = this.formBuilder.group({            
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            street: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
            provinceId: ['', [Validators.required]],
            regencyId: ['', [Validators.required]],
            districtId: ['', [Validators.required]],
            villageId: ['', [Validators.required]],
            postcode: ['', [Validators.required]],
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.adspot = data['adspot'];
            this.provinces = data['provinces'];
            this.allRegencies = data['regencies'];            
            this.allDistricts = data['districts'];
            this.allVillages = data['villages'];

            this.onAdspotRetrieved(this.adspot);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.adspotForm.valueChanges).debounceTime(800).subscribe(value => {
        this.adspotForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.adspotForm);
        });
    }

    onAdspotRetrieved(adspot: IAdspot): void {
        if (this.adspotForm) {
            this.adspotForm.reset();
        }
        this.adspot = adspot;

        if (!this.adspot || !this.adspot.id || this.adspot.id === 0) {
            this.pageTitle = 'Add Adspot';
        } else {
            this.pageTitle = `Edit Adspot: ${this.adspot.name}`;
        }

        // Update the data on the form
        if (this.adspot) {
            this.adspotForm.patchValue({                
                name: this.adspot.name || '',
                street: this.adspot.street || '',
                provinceId: this.adspot.provinceId || '',               
                postcode: this.adspot.postcode || '',
                isActive: this.adspot.isActive || false
            });

            this.onProvinceChanged();
            this.adspotForm.patchValue({
                regencyId: this.adspot.regencyId || ''
            });

            this.onRegencyChanged();
            this.adspotForm.patchValue({
                districtId: this.adspot.districtId || ''
            });

            this.onDistrictChanged();
            this.adspotForm.patchValue({
                villageId: this.adspot.villageId || ''
            });
        }
    }

    onProvinceChanged(): void {
        this.regencies = [];
        this.districts = [];
        this.villages = [];
        let provinceId = this.adspotForm.get('provinceId').value;
        this.regencies = this.allRegencies.filter(f => f.provinceId == provinceId);
    }

    onRegencyChanged(): void {
        this.districts = [];
        this.villages = [];
        let regencyId = this.adspotForm.get('regencyId').value;        
        this.districts = this.allDistricts.filter(f => f.regencyId == regencyId);
    }

    onDistrictChanged(): void {        
        this.villages = [];
        let districtId = this.adspotForm.get('districtId').value;        
        this.villages = this.allVillages.filter(f => f.districtId == districtId);
    }

    deleteAdspot(): void {
        if (this.adspot.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the adspot: ${this.adspot.name}?`)) {
                this.adspotService.deleteAdspot(this.adspot.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveAdspot(): void {
        if (this.adspotForm.valid) {
            // Copy the form values over the adspot object values
            let p = Object.assign({}, this.adspot, this.adspotForm.value);
            
            this.adspotService.saveAdspot(p)
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
        this.adspotForm.reset();
        this.router.navigate(['/master/adspots']);
    }


}