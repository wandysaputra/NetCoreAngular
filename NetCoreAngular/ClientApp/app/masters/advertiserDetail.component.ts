import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AdvertiserService } from "../services"
import { IAdvertiser, IProvince, IRegency, IDistrict, IVillage } from "../models"


@Component({  
  templateUrl: "advertiserDetail.component.html",
  styleUrls: []
})
export class AdvertiserDetailComponent implements OnInit {

    pageTitle: string = 'Advertiser Detail';
    advertiser: IAdvertiser;
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
        private advertiserService: AdvertiserService) {
    }
    
    ngOnInit(): void {       
        this.advertiser = this.route.snapshot.data['advertiser'];
        this.provinces = this.route.snapshot.data['provinces'];
        this.regencies = this.route.snapshot.data['regencies'];
        this.districts = this.route.snapshot.data['districts'];
        this.villages = this.route.snapshot.data['villages'];

        this.regency = this.regencies.filter(f => f.id == this.advertiser.regencyId)[0];
        this.province = this.provinces.filter(f => f.id == this.advertiser.provinceId)[0];
        this.district = this.districts.filter(f => f.id == this.advertiser.districtId)[0];
        this.village = this.villages.filter(f => f.id == this.advertiser.villageId)[0];
    }
}