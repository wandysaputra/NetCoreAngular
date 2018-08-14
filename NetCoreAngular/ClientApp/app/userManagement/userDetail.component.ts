import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { ValidatorService } from "../services"

import { IUser, IGroup } from "../models"

@Component({  
  templateUrl: "userDetail.component.html",
  styleUrls: []
})
export class UserDetailComponent implements OnInit {

    pageTitle: string = 'User Detail';
    user: IUser;
    allGroups: IGroup[];
    selectedGroups: IGroup[];
    errorMessage: string;


    constructor(private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {       
        this.user = this.route.snapshot.data['user'];
        this.allGroups = this.route.snapshot.data['groups'];

        this.selectedGroups = this.allGroups.filter(f => this.user.groupIds.indexOf(f.id) >= 0);
    }
}