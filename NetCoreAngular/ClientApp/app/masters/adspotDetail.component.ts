import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AdspotService } from "../services"
import { IAdspot, IProvince, IRegency, IDistrict, IVillage } from "../models"


@Component({  
  templateUrl: "adspotDetail.component.html",
  styleUrls: []
})
export class AdspotDetailComponent implements OnInit {

    pageTitle: string = 'Adspot Detail';
    adspot: IAdspot;
    provinces: IProvince[];
    province: IProvince;
    regencies: IRegency[];
    regency: IRegency;
    districts: IDistrict[];
    district: IDistrict;
    villages: IVillage[];
    village: IVillage;
    errorMessage: string;
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private adspotService: AdspotService) {
    }
    
    ngOnInit(): void {       
        this.adspot = this.route.snapshot.data['adspot'];
        this.provinces = this.route.snapshot.data['provinces'];
        this.regencies = this.route.snapshot.data['regencies'];
        this.districts = this.route.snapshot.data['districts'];
        this.villages = this.route.snapshot.data['villages'];

        this.regency = this.regencies.filter(f => f.id == this.adspot.regencyId)[0];
        this.province = this.provinces.filter(f => f.id == this.adspot.provinceId)[0];
        this.district = this.districts.filter(f => f.id == this.adspot.districtId)[0];
        this.village = this.villages.filter(f => f.id == this.adspot.villageId)[0];
    }
    
}