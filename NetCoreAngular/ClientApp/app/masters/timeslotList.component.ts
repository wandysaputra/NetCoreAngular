import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { TimeSlotService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { ITimeSlot } from "../models"

@Component({  
  templateUrl: "timeslotList.component.html",
  styleUrls: []
})
export class TimeSlotListComponent implements OnInit {

    pageTitle: string = 'TimeSlot List';    
    listFilter: string;
    errorMessage: string;
    page: number;

    timeslots: ITimeSlot[];

    constructor(private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {

        this.timeslots = this.route.snapshot.data['timeslots'];
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.page = this.route.snapshot.queryParams['page'] || 0;
    }    
    
}