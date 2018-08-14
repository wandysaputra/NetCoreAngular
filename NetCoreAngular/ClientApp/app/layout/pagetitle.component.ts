import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services";

@Component({ 
    selector:'[page-title]',
    templateUrl: "pagetitle.component.html",
    styleUrls: []
})
export class PageTitle {

    constructor(private authService: AuthService, private router: Router) { }

  
}