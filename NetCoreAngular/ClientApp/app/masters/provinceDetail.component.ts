import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { ProvinceService } from "../services"
import { IProvince } from "../models"


@Component({  
  templateUrl: "provinceDetail.component.html",
  styleUrls: []
})
export class ProvinceDetailComponent implements OnInit {

    pageTitle: string = 'Province Detail';
    province: IProvince;
    errorMessage: string;    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private provinceService: ProvinceService) {
    }
    
    ngOnInit(): void {       
        this.province = this.route.snapshot.data['province'];
    }
}