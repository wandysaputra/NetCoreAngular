import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { RegencyService } from "../services"
import { IRegency, IProvince } from "../models"


@Component({  
  templateUrl: "regencyDetail.component.html",
  styleUrls: []
})
export class RegencyDetailComponent implements OnInit {

    pageTitle: string = 'Regency Detail';
    regency: IRegency;
    provinces: IProvince[];
    province: IProvince;
    errorMessage: string;    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private regencyService: RegencyService) {
    }
    
    ngOnInit(): void {       
        this.regency = this.route.snapshot.data['regency'];
        this.provinces = this.route.snapshot.data['provinces'];
        this.province = this.provinces.filter(f => f.id == this.regency.provinceId)[0];
    }
}