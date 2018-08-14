import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UserService } from '../services';
import { IUser } from '../models';

@Injectable()
export class UserResolver implements Resolve<IUser> {

    constructor(private userService: UserService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
        let id = route.params['id'];
        if (!id) {
            console.log(`User id was not valid: ${id}`);
            this.router.navigate(['/users']);
            return Observable.of(null);
        }

        if (id == '0') {
            return Observable.of(null);
        }

        return this.userService.getUser(id)
            .map(user => {
                if (user) {
                    return user;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/users']);
                return Observable.of(null);
            });
    }
}
