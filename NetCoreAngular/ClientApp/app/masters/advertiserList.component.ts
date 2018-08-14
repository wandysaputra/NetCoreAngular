import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { AdvertiserService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IAdvertiser } from "../models"

@Component({  
  templateUrl: "advertiserList.component.html",
  styleUrls: []
})
export class AdvertiserListComponent implements OnInit {

    pageTitle: string = 'Advertiser List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    advertisers: IAdvertiser[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.advertisers = this.route.snapshot.data['advertisers'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;

    }    
    
}