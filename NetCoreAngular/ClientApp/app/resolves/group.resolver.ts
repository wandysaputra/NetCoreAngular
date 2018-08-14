import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GroupService } from '../services';
import { IGroup } from '../models';

@Injectable()
export class GroupResolver implements Resolve<IGroup> {

    constructor(private groupService: GroupService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroup> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Group id was not a number: ${id}`);
            this.router.navigate(['/groups']);
            return Observable.of(null);
        }
        return this.groupService.getGroup(+id)
            .map(group => {
                if (group) {
                    return group;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/groups']);
                return Observable.of(null);
            });
    }
}
