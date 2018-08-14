import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { AdspotService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IAdspot } from "../models"

@Component({  
  templateUrl: "adspotList.component.html",
  styleUrls: []
})
export class AdspotListComponent implements OnInit {

    pageTitle: string = 'Adspot List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    adspots: IAdspot[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.adspots = this.route.snapshot.data['adspots'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;
    }    
    
}