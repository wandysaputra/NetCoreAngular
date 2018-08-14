import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AdvertiserPostService } from "../services"
import { IAdvertiserPost, IAdvertiser } from "../models"


@Component({  
  templateUrl: "advertiserPostDetail.component.html",
  styleUrls: []
})
export class AdvertiserPostDetailComponent implements OnInit {

    pageTitle: string = 'AdvertiserPost Detail';
    advertiserPost: IAdvertiserPost;
    advertisers: IAdvertiser[];
    advertiser: IAdvertiser;
    errorMessage: string;
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private advertiserPostService: AdvertiserPostService) {
    }
    
    ngOnInit(): void {       
        this.advertiserPost = this.route.snapshot.data['advertiserPost'];
        this.advertisers = this.route.snapshot.data['advertisers'];
                
        this.advertiser = this.advertisers.filter(f => f.id == this.advertiserPost.advertiserId)[0];        
    }
}