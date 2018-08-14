import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { ITimeSlot } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { TimeSlotService } from "../services/index";

@Component({
    templateUrl: "timeslot.component.html",
    styleUrls: []
})
export class TimeSlotComponent implements OnInit, AfterViewInit {

    timeslotForm: FormGroup;
    timeslot: ITimeSlot;  
    pageTitle: string = 'TimeSlot';
    errorMessage: string;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private timeslotService: TimeSlotService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {            
            name: {
                required: 'Name is required.',
                minlength: 'Name must be at least three characters.',
                maxlength: 'Name cannot exceed 50 characters.'
            }
            , startTime: {
                required: 'Start time is required.'
            }, endTime: {
                required: 'End time is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.timeslotForm = this.formBuilder.group({            
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            startTime: ['', [Validators.required]],
            endTime: ['', [Validators.required]],
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.timeslot = data['timeslot'];
            this.onTimeSlotRetrieved(this.timeslot);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.timeslotForm.valueChanges).debounceTime(800).subscribe(value => {
        this.timeslotForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.timeslotForm);
        });
    }

    onTimeSlotRetrieved(timeslot: ITimeSlot): void {
        if (this.timeslotForm) {
            this.timeslotForm.reset();
        }
        this.timeslot = timeslot;

        if (!this.timeslot || !this.timeslot.id || this.timeslot.id === 0) {
            this.pageTitle = 'Add TimeSlot';
        } else {
            this.pageTitle = `Edit TimeSlot: ${this.timeslot.name}`;
        }

        // Update the data on the form
        if (this.timeslot) {
            this.timeslotForm.patchValue({                
                name: this.timeslot.name || '',
                startTime: this.timeslot.startTime || '',
                endTime: this.timeslot.endTime || '',
                isActive: this.timeslot.isActive || false
            });
        }
    }
    
    deleteTimeSlot(): void {
        if (this.timeslot.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the timeslot: ${this.timeslot.name}?`)) {
                this.timeslotService.deleteTimeSlot(this.timeslot.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveTimeSlot(): void {
        if (this.timeslotForm.valid) {
            // Copy the form values over the timeslot object values
            let p = Object.assign({}, this.timeslot, this.timeslotForm.value);
            
            this.timeslotService.saveTimeSlot(p)
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
        this.timeslotForm.reset();
        this.router.navigate(['/master/timeslots']);
    }


}