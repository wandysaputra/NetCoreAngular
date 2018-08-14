import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { VillageService } from '../services';
import { IVillage } from '../models';

@Injectable()
export class VillageResolver implements Resolve<IVillage> {

    constructor(private villageService: VillageService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVillage> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Village id was not a number: ${id}`);
            this.router.navigate(['/villages']);
            return Observable.of(null);
        }
        return this.villageService.getVillage(+id)
            .map(village => {
                if (village) {
                    return village;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/villages']);
                return Observable.of(null);
            });
    }
}
