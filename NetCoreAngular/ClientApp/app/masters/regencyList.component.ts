import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { RegencyService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IRegency } from "../models"

@Component({  
  templateUrl: "regencyList.component.html",
  styleUrls: []
})
export class RegencyListComponent implements OnInit {

    pageTitle: string = 'Regency List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    regencies: IRegency[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.regencies = this.route.snapshot.data['regencies'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;
    }    
    
}