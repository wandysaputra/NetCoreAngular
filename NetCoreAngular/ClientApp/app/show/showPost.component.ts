import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AdvertiserPostService } from "../services"
import { IAdvertiserPost, IAdvertiser } from "../models"


@Component({  
  templateUrl: "showPost.component.html",
  styles: ['body {background-color: #ffffff; }']
})
export class ShowPostComponent implements OnInit {

    
    advertiserPost: IAdvertiserPost;    
        
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }
    
    ngOnInit(): void {       
        this.advertiserPost = this.route.snapshot.data['advertiserPost'];
    }
}