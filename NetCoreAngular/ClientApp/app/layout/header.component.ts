import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services";

@Component({  
    selector: '[header]',
    templateUrl: "header.component.html",
    styleUrls: []
})
export class Header {

    constructor(private authService: AuthService, private router: Router) { }

    get username(): string {
        return this.authService.username;
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
}