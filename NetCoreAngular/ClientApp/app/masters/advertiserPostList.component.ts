import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { AdvertiserPostService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IAdvertiserPost } from "../models"

@Component({  
  templateUrl: "advertiserPostList.component.html",
  styleUrls: []
})
export class AdvertiserPostListComponent implements OnInit {

    pageTitle: string = 'AdvertiserPost List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    advertiserPosts: IAdvertiserPost[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.advertiserPosts = this.route.snapshot.data['advertiserPosts'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;

    }    
    
}