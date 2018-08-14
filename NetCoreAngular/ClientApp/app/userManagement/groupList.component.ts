import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { GroupService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IGroup } from "../models"

@Component({  
  templateUrl: "groupList.component.html",
  styleUrls: []
})
export class GroupListComponent implements OnInit {

    pageTitle: string = 'Group List';    
    listFilter: string;
    errorMessage: string;

    groups: IGroup[];

    constructor(private groupService: GroupService, private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {
        this.groupService.getGroups()
            .subscribe(groups => this.groups = groups,
            error => this.errorMessage = <any>error);

        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    }    
    
}