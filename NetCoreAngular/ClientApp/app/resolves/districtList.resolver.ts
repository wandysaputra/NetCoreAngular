import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DistrictService } from '../services';
import { IDistrict } from '../models';

@Injectable()
export class DistrictListResolver implements Resolve<IDistrict> {

    constructor(private districtService: DistrictService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDistrict> {
        //let id = route.params['id'];
        //if (isNaN(id)) {
        //    console.log(`District id was not a number: ${id}`);
        //    this.router.navigate(['/districts']);
        //    return Observable.of(null);
        //}

        return this.districtService.getDistricts()
            .map(district => {
                if (district) {
                    return district;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                //this.router.navigate(['/districts']);
                return Observable.of(null);
            });
    }
}
