import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({      
    templateUrl: "login.component.html",
    styleUrls: []
})
export class LoginComponent implements OnInit, OnDestroy {

    constructor(private authService: AuthService, private router: Router, private spinner: Ng4LoadingSpinnerService) { }

    errorMessage: string = "";
    public creds = {
        username: "",
        password: ""
    };

    onLogin() {
        this.spinner.show();
        this.authService.login(this.creds)
            .subscribe(success => {
                if (success) {
                    this.spinner.hide();
                    this.router.navigate([""]);
                }
            }, err => {
                this.errorMessage = "Failed to login";
                this.spinner.hide();
            });
    }

    ngOnInit() {       
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login');
    }

    ngOnDestroy(): void {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login');
    }
}