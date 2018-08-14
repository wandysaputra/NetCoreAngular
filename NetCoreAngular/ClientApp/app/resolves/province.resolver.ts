import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ProvinceService } from '../services';
import { IProvince } from '../models';

@Injectable()
export class ProvinceResolver implements Resolve<IProvince> {

    constructor(private provinceService: ProvinceService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProvince> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Province id was not a number: ${id}`);
            this.router.navigate(['/provinces']);
            return Observable.of(null);
        }
        return this.provinceService.getProvince(+id)
            .map(province => {
                if (province) {
                    return province;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/provinces']);
                return Observable.of(null);
            });
    }
}
