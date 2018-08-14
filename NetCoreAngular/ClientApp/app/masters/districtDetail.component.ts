import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { DistrictService } from "../services"
import { IDistrict, IProvince, IRegency } from "../models"


@Component({  
  templateUrl: "districtDetail.component.html",
  styleUrls: []
})
export class DistrictDetailComponent implements OnInit {

    pageTitle: string = 'District Detail';
    district: IDistrict;
    provinces: IProvince[];
    province: IProvince;
    regencies: IRegency[];
    regency: IRegency;
    errorMessage: string;    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private districtService: DistrictService) {
    }
    
    ngOnInit(): void {       
        this.district = this.route.snapshot.data['district'];
        this.provinces = this.route.snapshot.data['provinces'];
        this.regencies = this.route.snapshot.data['regencies'];

        this.regency = this.regencies.filter(f => f.id == this.district.regencyId)[0];
        this.province = this.provinces.filter(f => f.id == this.regency.provinceId)[0];
    }

}