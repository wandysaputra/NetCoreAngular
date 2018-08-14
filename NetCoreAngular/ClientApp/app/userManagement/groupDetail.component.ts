import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { GroupService } from "../services"
import { IGroup, IMenu } from "../models"


@Component({  
  templateUrl: "groupDetail.component.html",
  styleUrls: []
})
export class GroupDetailComponent implements OnInit {

    pageTitle: string = 'Group Detail';
    group: IGroup;
    allMenus: IMenu[];
    selectedMenus: IMenu[];
    errorMessage: string;
    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService) {
    }
    
    ngOnInit(): void {
       
        this.group = this.route.snapshot.data['group'];
        this.allMenus = this.route.snapshot.data['menus'];

        this.selectedMenus = this.allMenus.filter(f => this.group.menuIds.indexOf(f.id) >= 0);
    }

    
    
    
    
}