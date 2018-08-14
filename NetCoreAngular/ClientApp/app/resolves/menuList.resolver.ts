import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { MenuService } from '../services';
import { IMenu } from '../models';

@Injectable()
export class MenuListResolver implements Resolve<IMenu[]> {

    constructor(private menuService: MenuService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMenu[]> {
        //let id = route.params['id'];
        //if (isNaN(id)) {
        //    console.log(`Menu id was not a number: ${id}`);
        //    this.router.navigate(['/menus']);
        //    return Observable.of(null);
        //}

        return this.menuService.getMenus()
            .map(menus => {
                if (menus) {
                    return menus;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                //this.router.navigate(['/menus']);
                return Observable.of(null);
            });
    }
}
