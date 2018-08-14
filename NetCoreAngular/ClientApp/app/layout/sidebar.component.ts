import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AuthService } from "../services";


export interface ISidebarMenu {
    id: number;
    code: string;
    title: string;
    url: string;
    icon: string;
    parentMenuId: number;
    childs: ISidebarMenu[];
    selected: boolean;
    isActive: boolean;
}

export class SidebarMenu implements ISidebarMenu {


    public parentMenuId: number;
    public selected: boolean;

    constructor(public id: number, public code: string, public title: string, public url: string, public icon: string, public childs: ISidebarMenu[], public isActive: boolean) {
        this.selected = false;
    }

}

@Component({  
    selector: '[side-bar]',
    templateUrl: "sidebar.component.html",
    styleUrls: []
})
export class SideBar implements OnInit {

    public menus: ISidebarMenu[];

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
        let childMenus: ISidebarMenu[] = [new SidebarMenu(2, '2', 'Menu', '/userManagement/menus', 'icon-menu', null, true)
            , new SidebarMenu(3, '3', 'Group', '/userManagement/groups', 'icon-people', null, true)
            , new SidebarMenu(4, '4', 'User', '/userManagement/users', 'icon-user', null, true)
        ];

        let childMasterMenus: ISidebarMenu[] = [
            new SidebarMenu(6, '6', 'Province', '/master/provinces', 'icon-layers', null, true)
            , new SidebarMenu(7, '7', 'Regency', '/master/regencies', 'icon-directions', null, true)
            , new SidebarMenu(8, '8', 'District', '/master/districts', 'icon-compass', null, true)
            , new SidebarMenu(9, '9', 'Village', '/master/villages', 'icon-map', null, true)
            , new SidebarMenu(10, '10', 'Time Slot', '/master/timeslots', 'icon-timer', null, true)
            , new SidebarMenu(11, '11', 'AdSpot', '/master/adspots', 'icon-feed', null, true)
            , new SidebarMenu(12, '12', 'Advertiser', '/master/advertisers', 'icon-docs', null, true)
            , new SidebarMenu(13, '13', 'Advertiser Post', '/master/advertiserPosts', 'icon-post', null, true)
        ];

        this.menus = [new SidebarMenu(1, '1', 'User Management', '/userManagement', 'icon-users', childMenus, true)
            , new SidebarMenu(5, '5', 'Master', '/master', 'icon-settings', childMasterMenus, true)];
    }    

    ngOnInit() {
        //subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {

            //set 
            let root: ActivatedRoute = this.activatedRoute.root;
            //if (this.menus)
            //    this.clearMenuSelection(this.menus);
            this.setMenuSelected(root);
        });
    }

    setMenuSelected(route: ActivatedRoute, url:string='') {
        //get the child routes
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return;
        }

        //let routeURL: string = route.snapshot.url.map(segment => segment.path).join("/");
        //url += `${routeURL}`;
        //console.log('routeURL::' + routeURL);
        //console.log('url parent::' + url);
        //if (url) {
        //    let menu: ISidebarMenu = this.getMenu(this.menus, url);
        //    if (menu) {
        //        menu.selected = true;
        //        console.log('menu parent::' + JSON.stringify(menu));
        //    }
        //}

        for (let child of children) {

            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
            if (url) {
                url += `/${routeURL}`;
            }
            else {
                url += `${routeURL}`;
            }
            //console.log('routeURL::' + routeURL);
            //console.log('url child::' + url);
            if (url) {
                let menu: ISidebarMenu = this.getMenu(this.menus, url);
                if (menu) {
                    menu.selected = true;
                    //console.log('menu child::' + JSON.stringify(menu));
                }
            }

            return this.setMenuSelected(child, url);
        }       
      
    }

    getMenu(menus: ISidebarMenu[], url:string) {
        if (menus) {
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].url == url) {
                    return menus[i];
                }
                var found = this.getMenu(menus[i].childs, url);
                if (found) return found;
            }
        }
    };

    
    clearMenuSelection(menus:ISidebarMenu[]): void {
        if (!menus)
            return;
        for (let menu of menus) {
            this.clearChildSelection(menu);
            menu.selected = false
        }
    }

    clearChildSelection(menu: ISidebarMenu): void {
        if (!menu)
            return;

        for (let child of menu.childs) {            
            this.clearChildSelection(child);
            child.selected = false;
        }        
    }

    onMenuClick(m: ISidebarMenu): void {
        //if (this.menus)
        //    this.clearMenuSelection(this.menus);

        if (m.selected) {
            m.selected = false;
        }
        else {
            m.selected = true;
        }
    }
}