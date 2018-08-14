import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TimeSlotService } from '../services';
import { ITimeSlot } from '../models';

@Injectable()
export class TimeSlotListResolver implements Resolve<ITimeSlot> {

    constructor(private timeslotService: TimeSlotService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITimeSlot> {
        //let id = route.params['id'];
        //if (isNaN(id)) {
        //    console.log(`TimeSlot id was not a number: ${id}`);
        //    this.router.navigate(['/timeslots']);
        //    return Observable.of(null);
        //}

        return this.timeslotService.getTimeSlots()
            .map(timeslot => {
                if (timeslot) {
                    return timeslot;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                //this.router.navigate(['/timeslots']);
                return Observable.of(null);
            });
    }
}
