import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { AuthService } from "../app/services";

@Component({
  selector: 'my-app',
  templateUrl:'app.component.html',
  
})
export class AppComponent implements OnInit {
    title = 'Net Core Angular';
    
    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {

        

    }

    ngOnInit(): void {
       

    }
}
