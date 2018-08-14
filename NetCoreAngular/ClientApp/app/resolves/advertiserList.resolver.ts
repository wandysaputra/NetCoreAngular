import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AdvertiserService } from '../services';
import { IAdvertiser } from '../models';

@Injectable()
export class AdvertiserListResolver implements Resolve<IAdvertiser> {

    constructor(private advertiserService: AdvertiserService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdvertiser> {
        //let id = route.params['id'];
        //if (isNaN(id)) {
        //    console.log(`Advertiser id was not a number: ${id}`);
        //    this.router.navigate(['/advertisers']);
        //    return Observable.of(null);
        //}

        return this.advertiserService.getAdvertisers()
            .map(advertiser => {
                if (advertiser) {
                    return advertiser;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error advertisers: ${error}`);
                //this.router.navigate(['/advertisers']);
                return Observable.of(null);
            });
    }
}
