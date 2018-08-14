
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ShowPostService } from '../services';
import { IAdvertiserPost } from '../models';

@Injectable()
export class ShowPostResolver implements Resolve<IAdvertiserPost> {

    constructor(private showPostService: ShowPostService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdvertiserPost> {
        let id = route.params['id'];
        if (isNaN(id)) {
            //console.log(`AdvertiserPost id was not a number: ${id}`);
            //this.router.navigate(['/advertiserPosts']);
            return Observable.of(null);
        }
        return this.showPostService.showPost(+id)
            .map(advertiserPost => {
                if (advertiserPost) {
                    return advertiserPost;
                }
                return Observable.of(null);
            })
            .catch(error => {
                //console.log(`Retrieval error advertiserPost: ${error}`);
                //this.router.navigate(['/advertiserPosts']);
                return Observable.of(null);
            });
    }
}
