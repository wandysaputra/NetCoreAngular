﻿import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET  } from "@angular/router";
import { AuthService } from "../services";

interface IBreadcrumb {
    label: string;
    params?: Params;
    url: string;
}


@Component({ 
    selector:'[page-bar]',
    templateUrl: "pagebar.component.html",
    styleUrls: []
})
export class PageBar implements OnInit{

    breadcrumbs: IBreadcrumb[];

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {

            //set breadcrumbs
            let root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //get the child routes
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
            //console.log('routeURL::' + routeURL);
            //append route URL to URL
            url += `/${routeURL}`;
            //console.log('url::' + url);

            //add breadcrumb
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url
            };
            //console.log('breadcrumb::' + JSON.stringify(breadcrumb));

            breadcrumbs.push(breadcrumb);

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }

        //we should never get here, but just in case
        return breadcrumbs;
    }

}