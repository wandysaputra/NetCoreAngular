import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AdvertiserPostService } from '../services';
import { IAdvertiserPost } from '../models';

@Injectable()
export class AdvertiserPostListResolver implements Resolve<IAdvertiserPost> {

    constructor(private advertiserPostService: AdvertiserPostService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdvertiserPost> {
        //let id = route.params['id'];
        //if (isNaN(id)) {
        //    console.log(`AdvertiserPost id was not a number: ${id}`);
        //    this.router.navigate(['/advertiserPosts']);
        //    return Observable.of(null);
        //}

        return this.advertiserPostService.getAdvertiserPosts()
            .map(advertiserPost => {
                if (advertiserPost) {
                    return advertiserPost;
                }
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error advertiserPosts: ${error}`);
                //this.router.navigate(['/advertiserPosts']);
                return Observable.of(null);
            });
    }
}
