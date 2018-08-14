import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IAdvertiser, IProvince, IRegency, IDistrict, IVillage } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { AdvertiserService } from "../services/index";

@Component({
    templateUrl: "advertiser.component.html",
    styleUrls: []
})
export class AdvertiserComponent implements OnInit, AfterViewInit {
    
    pageTitle: string = 'Advertiser';
    errorMessage: string;
    advertiserForm: FormGroup;
    advertiser: IAdvertiser;  
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

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private advertiserService: AdvertiserService) {
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
        this.advertiserForm = this.formBuilder.group({            
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
            this.advertiser = data['advertiser'];
            this.provinces = data['provinces'];
            this.allRegencies = data['regencies'];            
            this.allDistricts = data['districts'];
            this.allVillages = data['villages'];

            this.onAdvertiserRetrieved(this.advertiser);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.advertiserForm.valueChanges).debounceTime(800).subscribe(value => {
        this.advertiserForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.advertiserForm);
        });
    }

    onAdvertiserRetrieved(advertiser: IAdvertiser): void {
        if (this.advertiserForm) {
            this.advertiserForm.reset();
        }
        this.advertiser = advertiser;

        if (!this.advertiser || !this.advertiser.id || this.advertiser.id === 0) {
            this.pageTitle = 'Add Advertiser';
        } else {
            this.pageTitle = `Edit Advertiser: ${this.advertiser.name}`;
        }

        // Update the data on the form
        if (this.advertiser) {
            this.advertiserForm.patchValue({                
                name: this.advertiser.name || '',
                street: this.advertiser.street || '',
                provinceId: this.advertiser.provinceId || '',               
                postcode: this.advertiser.postcode || '',
                isActive: this.advertiser.isActive || false
            });

            this.onProvinceChanged();
            this.advertiserForm.patchValue({
                regencyId: this.advertiser.regencyId || ''
            });

            this.onRegencyChanged();
            this.advertiserForm.patchValue({
                districtId: this.advertiser.districtId || ''
            });

            this.onDistrictChanged();
            this.advertiserForm.patchValue({
                villageId: this.advertiser.villageId || ''
            });
        }
    }

    onProvinceChanged(): void {
        this.regencies = [];
        this.districts = [];
        this.villages = [];
        let provinceId = this.advertiserForm.get('provinceId').value;
        this.regencies = this.allRegencies.filter(f => f.provinceId == provinceId);
    }

    onRegencyChanged(): void {
        this.districts = [];
        this.villages = [];
        let regencyId = this.advertiserForm.get('regencyId').value;        
        this.districts = this.allDistricts.filter(f => f.regencyId == regencyId);
    }

    onDistrictChanged(): void {        
        this.villages = [];
        let districtId = this.advertiserForm.get('districtId').value;        
        this.villages = this.allVillages.filter(f => f.districtId == districtId);
    }

    deleteAdvertiser(): void {
        if (this.advertiser.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the advertiser: ${this.advertiser.name}?`)) {
                this.advertiserService.deleteAdvertiser(this.advertiser.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveAdvertiser(): void {
        if (this.advertiserForm.valid) {
            // Copy the form values over the advertiser object values
            let p = Object.assign({}, this.advertiser, this.advertiserForm.value);
            
            this.advertiserService.saveAdvertiser(p)
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
        this.advertiserForm.reset();
        this.router.navigate(['/master/advertisers']);
    }


}