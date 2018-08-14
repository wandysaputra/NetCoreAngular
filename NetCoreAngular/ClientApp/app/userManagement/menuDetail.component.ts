import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MenuService } from "../services"
import { IMenu } from "../models"


@Component({  
  templateUrl: "menuDetail.component.html",
  styleUrls: []
})
export class MenuDetailComponent implements OnInit {

    pageTitle: string = 'Menu Detail';
    menu: IMenu;
    errorMessage: string;
    
        
    constructor(private route: ActivatedRoute,
        private router: Router,
        private menuService: MenuService) {
    }
    
    ngOnInit(): void {
        let menu = this.route.snapshot.data['menu'];
        if (menu.parentMenuId) {
            this.menuService.getMenu(menu.parentMenuId)
                .subscribe(parentMenu => { this.menu = menu; this.menu.parentMenu = parentMenu;  },
                error => this.errorMessage = <any>error);
        }
    }
}