import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AdspotService } from '../services';
import { IAdspot } from '../models';

@Injectable()
export class AdspotResolver implements Resolve<IAdspot> {

    constructor(private adspotService: AdspotService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdspot> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Adspot id was not a number: ${id}`);
            this.router.navigate(['/adspots']);
            return Observable.of(null);
        }
        return this.adspotService.getAdspot(+id)
            .map(adspot => {
                if (adspot) {
                    return adspot;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error adspot: ${error}`);
                this.router.navigate(['/adspots']);
                return Observable.of(null);
            });
    }
}
