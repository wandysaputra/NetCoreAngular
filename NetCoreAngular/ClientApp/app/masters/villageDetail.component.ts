import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { VillageService } from "../services"
import { IVillage, IProvince, IRegency, IDistrict } from "../models"


@Component({  
  templateUrl: "villageDetail.component.html",
  styleUrls: []
})
export class VillageDetailComponent implements OnInit {

    pageTitle: string = 'Village Detail';
    village: IVillage;
    provinces: IProvince[];
    province: IProvince;
    regencies: IRegency[];
    regency: IRegency;
    districts: IDistrict[];
    district: IDistrict;
    errorMessage: string;    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private villageService: VillageService) {
    }
    
    ngOnInit(): void {       
        this.village = this.route.snapshot.data['village'];
        this.provinces = this.route.snapshot.data['provinces'];
        this.regencies = this.route.snapshot.data['regencies'];
        this.districts = this.route.snapshot.data['districts'];

        this.district = this.districts.filter(f => f.id = this.village.districtId)[0];
        console.log('district::' + JSON.stringify(this.district));
        this.regency = this.regencies.filter(f => f.id == this.district.regencyId)[0];
        this.province = this.provinces.filter(f => f.id == this.regency.provinceId)[0];
    }
    
}