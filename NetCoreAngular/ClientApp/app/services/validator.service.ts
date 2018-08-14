import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";

@Injectable()
export class ValidatorService {

    constructor() {

    }

    private validationMessages = {
        required: 'This field is required',
        pattern: 'Please enter a valid value.'
        //minlength: 'Please enter at least 4 characters.'
    };


    public emailMatcher(c: AbstractControl, firstControlName: string, secondControlName: string): { [key: string]: boolean } | null {
        let firstControl = c.get(firstControlName);
        let secondControl = c.get(secondControlName);
        if (firstControl.pristine || secondControl.pristine) {
            return null;
        }
        if (firstControl.value === secondControl.value) {
            return null;
        }
        return { 'match': true };
    }

    public ratingRange(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            };
            return null;
        };
    }

    public getErrorMessages(c: AbstractControl): string {        
        if ((c.touched || c.dirty) && c.errors) {
            return Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }

        return null;
    }
}