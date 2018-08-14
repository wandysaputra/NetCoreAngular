import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { DistrictService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IDistrict } from "../models"

@Component({  
  templateUrl: "districtList.component.html",
  styleUrls: []
})
export class DistrictListComponent implements OnInit {

    pageTitle: string = 'District List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    districts: IDistrict[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.districts = this.route.snapshot.data['districts'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;
    }    
    
}