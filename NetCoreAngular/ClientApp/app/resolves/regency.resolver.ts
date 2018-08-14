import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { RegencyService } from '../services';
import { IRegency } from '../models';

@Injectable()
export class RegencyResolver implements Resolve<IRegency> {

    constructor(private regencyService: RegencyService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRegency> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Regency id was not a number: ${id}`);
            this.router.navigate(['/regencies']);
            return Observable.of(null);
        }
        return this.regencyService.getRegency(+id)
            .map(regency => {
                if (regency) {
                    return regency;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/regencies']);
                return Observable.of(null);
            });
    }
}
