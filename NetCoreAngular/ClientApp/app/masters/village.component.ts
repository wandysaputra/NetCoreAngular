import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IVillage, IProvince, IRegency, IDistrict } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { VillageService } from "../services/index";

@Component({
    templateUrl: "village.component.html",
    styleUrls: []
})
export class VillageComponent implements OnInit, AfterViewInit {
    
    pageTitle: string = 'Village';
    errorMessage: string;
    villageForm: FormGroup;
    village: IVillage;  
    provinces: IProvince[];
    regencies: IRegency[];
    allRegencies: IRegency[];
    districts: IDistrict[];
    allDistricts: IDistrict[];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private villageService: VillageService) {
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
            },
            districtId: {
                required: 'District is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.villageForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            provinceId: ['', [Validators.required]],
            regencyId: ['', [Validators.required]],
            districtId: ['', [Validators.required]],
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.village = data['village'];
            this.provinces = data['provinces'];
            this.allRegencies = data['regencies'];
            this.allDistricts = data['districts'];

            this.onVillageRetrieved(this.village);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.villageForm.valueChanges).debounceTime(800).subscribe(value => {
        this.villageForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.villageForm);
        });
    }

    onVillageRetrieved(village: IVillage): void {
        if (this.villageForm) {
            this.villageForm.reset();
        }
        this.village = village;

        if (!this.village || !this.village.id || this.village.id === 0) {
            this.pageTitle = 'Add Village';
        } else {
            this.pageTitle = `Edit Village: ${this.village.name}`;
        }

        // Update the data on the form
        if (this.village) {
            let district = this.allDistricts.filter(f => f.id == this.village.districtId)[0];
            let provinceId = 0;
            let regencyId = 0;
            let districtId = 0;

            if (district) {
                let regency = this.allRegencies.filter(f => f.id == district.regencyId)[0];
                districtId = district.id;
                console.log('district::' + JSON.stringify(district));
                console.log('districtId::' + districtId);
                if (regency) {
                    this.regencies = this.allRegencies.filter(f => f.provinceId == regency.provinceId);
                    provinceId = regency.provinceId;                    
                    regencyId = regency.id;                    
                    
                }
            }

            this.villageForm.patchValue({
                code: this.village.code || '',
                name: this.village.name || '',
                provinceId: provinceId ||'',
                regencyId: regencyId || '',
                districtId: districtId || '',
                isActive: this.village.isActive || false
            });

            this.onProvinceChanged();
            //this.villageForm.patchValue({                
            //    regencyId: regencyId || ''
            //});

            this.onRegencyChanged();
            //this.villageForm.patchValue({
            //    districtId: districtId || ''
            //});
        }
    }

    onProvinceChanged(): void {
        this.regencies = [];
        this.districts = [];
        let provinceId = this.villageForm.get('provinceId').value;
        this.regencies = this.allRegencies.filter(f => f.provinceId == provinceId);
    }

    onRegencyChanged(): void {
        let regencyId = this.villageForm.get('regencyId').value;
        this.districts = this.allDistricts.filter(f => f.regencyId == regencyId);
    }

    deleteVillage(): void {
        if (this.village.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the village: ${this.village.name}?`)) {
                this.villageService.deleteVillage(this.village.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveVillage(): void {
        if (this.villageForm.valid) {
            // Copy the form values over the village object values
            let p = Object.assign({}, this.village, this.villageForm.value);
            
            this.villageService.saveVillage(p)
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
        this.villageForm.reset();
        this.router.navigate(['/master/villages']);
    }


}