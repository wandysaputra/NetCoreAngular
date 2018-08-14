import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

import { MenuService } from "../services"
import { FilterPipe } from '../pipes/filter.pipe';
import { IMenu } from "../models"

@Component({  
  templateUrl: "menuList.component.html",
  styleUrls: []
})
export class MenuListComponent implements OnInit {

    pageTitle: string = 'Menu List';    
    listFilter: string;
    errorMessage: string;

    menus: IMenu[];

    constructor(private menuService: MenuService, private route: ActivatedRoute) {

    }
        
    ngOnInit(): void {
        this.menuService.getMenus()
            .subscribe(menus => this.menus = menus,
            error => this.errorMessage = <any>error);

        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    }    
    
}