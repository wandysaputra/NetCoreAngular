import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { IAdvertiserPost, IAdvertiser } from "../models"
import { GenericValidator } from "../shared/generic.validator";
import { AdvertiserPostService } from "../services/index";

@Component({
    templateUrl: "advertiserPost.component.html",
    styleUrls: []
})
export class AdvertiserPostComponent implements OnInit, AfterViewInit {
    
    pageTitle: string = 'AdvertiserPost';
    errorMessage: string;
    advertiserPostForm: FormGroup;
    advertiserPost: IAdvertiserPost;
    advertisers: IAdvertiser[];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    get getPostTypeId() : number { return this.advertiserPostForm.get('postTypeId').value; }

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private advertiserPostService: AdvertiserPostService) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {          
            code: {
                required: 'Code is required.',
                minlength: 'Code must be at least three characters.',
                maxlength: 'Code cannot exceed 100 characters.'
            }
            , name: {
                required: 'Name is required.',
                minlength: 'Name must be at least 10 characters.',
                maxlength: 'Name cannot exceed 200 characters.'
            }
            , postTypeId: {
                required: 'Post Type is required.'
            }
            , advertiserId: {
                required: 'Advertiser is required.'
            }            
            , activeDate: {
                required: 'Active date is required.'
            }            
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.advertiserPostForm = this.formBuilder.group({            
            code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            postTypeId: ['', [Validators.required]],
            activeDate: ['', [Validators.required]],
            advertiserId: ['', [Validators.required]],
            imageUrl: null,
            html: [''],            
            isActive: ['']
        });

        this.route.data.subscribe(data => {            
            this.advertiserPost = data['advertiserPost'];
            this.advertisers = data['advertisers'];

            this.onAdvertiserPostRetrieved(this.advertiserPost);            
        });
    }
    
    ngAfterViewInit(): void {        
        // Merge the blur event observable with the valueChanges observable
        //Observable.merge(this.advertiserPostForm.valueChanges).debounceTime(800).subscribe(value => {
        this.advertiserPostForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.advertiserPostForm);
        });
    }

    onAdvertiserPostRetrieved(advertiserPost: IAdvertiserPost): void {
        if (this.advertiserPostForm) {
            this.advertiserPostForm.reset();
        }
        this.advertiserPost = advertiserPost;

        if (!this.advertiserPost || !this.advertiserPost.id || this.advertiserPost.id === 0) {
            this.pageTitle = 'Add AdvertiserPost';
        } else {
            this.pageTitle = `Edit AdvertiserPost: ${this.advertiserPost.name}`;
        }

        this.localUrl = this.advertiserPost.imageUrl;
        // Update the data on the form
        if (this.advertiserPost) {
            this.advertiserPostForm.patchValue({
                code: this.advertiserPost.code,
                name: this.advertiserPost.name,
                postTypeId: this.advertiserPost.postTypeId,
                advertiserId: this.advertiserPost.advertiserId,
                //imageUrl: this.advertiserPost.imageUrl,
                html: this.advertiserPost.html,
                isActive: this.advertiserPost.isActive,
                activeDate: [new Date(this.advertiserPost.activeFrom), new Date(this.advertiserPost.activeTo)]
            });

           
        }
    }

    localUrl: any;  
    imageFile: File;
   
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {

            this.imageFile = fileList[0];
            var reader = new FileReader();

            reader.onload = (event: any) => {
                this.localUrl = event.target.result;

                this.advertiserPostForm.patchValue({                  
                    imageUrl: this.imageFile                  
                });                
            }

            reader.readAsDataURL(this.imageFile);

            //let formData: FormData = new FormData();
            //formData.append('uploadFile', file, file.name);
            //let headers = new Headers();
            ///** No need to include Content-Type in Angular 4 */
            //headers.append('Content-Type', 'multipart/form-data');
            //headers.append('Accept', 'application/json');
            //let options = new RequestOptions({ headers: headers });
            //this.http.post(`${this.apiEndPoint}`, formData, options)
            //    .map(res => res.json())
            //    .catch(error => Observable.throw(error))
            //    .subscribe(
            //    data => console.log('success'),
            //    error => console.log(error)
            //    )
        }
    }
    
    deleteAdvertiserPost(): void {
        if (this.advertiserPost.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the advertiserPost: ${this.advertiserPost.name}?`)) {
                this.advertiserPostService.deleteAdvertiserPost(this.advertiserPost.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveAdvertiserPost(): void {
        if (this.advertiserPostForm.valid) {
            // Copy the form values over the advertiserPost object values
            let p = Object.assign({}, this.advertiserPost, this.advertiserPostForm.value);

            let activetDateRange = this.advertiserPostForm.get('activeDate').value;
            p.activeFrom = new Date(activetDateRange[0]);
            p.activeTo = new Date(activetDateRange[1]);

            console.log('p::' + JSON.stringify(p));

            this.advertiserPostService.saveAdvertiserPost(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => { this.errorMessage = <any>error; console.log('Error Message::' + error); }
                );
        } else  {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the 
        console.log('onSaveComplete');
        this.advertiserPostForm.reset();
        this.router.navigate(['/master/advertiserPosts']);
    }
}