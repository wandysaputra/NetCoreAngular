import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { TimeSlotService } from "../services"
import { ITimeSlot } from "../models"


@Component({  
  templateUrl: "timeslotDetail.component.html",
  styleUrls: []
})
export class TimeSlotDetailComponent implements OnInit {

    pageTitle: string = 'TimeSlot Detail';
    timeslot: ITimeSlot;
    errorMessage: string;    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private timeslotService: TimeSlotService) {
    }
    
    ngOnInit(): void {       
        this.timeslot = this.route.snapshot.data['timeslot'];
    }
}