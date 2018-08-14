import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { UserService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IUser } from "../models"

@Component({  
  templateUrl: "userList.component.html",
  styleUrls: []
})
export class UserListComponent implements OnInit {

    pageTitle: string = 'User List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    users: IUser[];

    constructor(private userService: UserService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.userService.getUsers()
            .subscribe(users => this.users = users,
            error => this.errorMessage = <any>error);

        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    }

}