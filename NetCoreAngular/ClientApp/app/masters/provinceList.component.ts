import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { ProvinceService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IProvince } from "../models"

@Component({  
  templateUrl: "provinceList.component.html",
  styleUrls: []
})
export class ProvinceListComponent implements OnInit {

    pageTitle: string = 'Province List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    provinces: IProvince[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.provinces = this.route.snapshot.data['provinces'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;
    }    
    
}