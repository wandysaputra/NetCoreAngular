import { Component, OnInit, OnDestroy  } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services";

@Component({  
    selector:'dashboard',
    templateUrl: "dashboard.component.html",
    styleUrls: []
})
export class DashboardComponent implements OnInit, OnDestroy  {

    constructor(private authService: AuthService, private router: Router) { }

    loginRequired: boolean;

    ngOnInit() {
        this.loginRequired = this.authService.loginRequired;
        console.log('loginRequired::' + this.loginRequired);

        const body = document.getElementsByTagName('body')[0];
        body.classList.add('page-header-fixed');
        body.classList.add('page-sidebar-closed-hide-logo');
        body.classList.add('page-content-white');
    }

    ngOnDestroy(): void {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('page-header-fixed');
        body.classList.remove('page-sidebar-closed-hide-logo');
        body.classList.remove('page-content-white');
    }
   
}