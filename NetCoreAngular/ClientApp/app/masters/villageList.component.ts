import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { VillageService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IVillage } from "../models"

@Component({  
  templateUrl: "villageList.component.html",
  styleUrls: []
})
export class VillageListComponent implements OnInit {

    pageTitle: string = 'Village List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    villages: IVillage[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.villages = this.route.snapshot.data['villages'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;
    }    
    
}