import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    UserComponent, UserListComponent, UserDetailComponent
    , MenuComponent, MenuDetailComponent, MenuListComponent
    , GroupComponent, GroupDetailComponent, GroupListComponent
} from '.';


import { UserResolver, MenuResolver, MenuListResolver, GroupResolver, GroupListResolver } from '../resolves';

import { AuthGuardService } from '../services';

let routes: Routes =
    [
        { path: 'menus', component: MenuListComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Menu', Title: 'Menu' } }
        , { path: 'menus/:id', component: MenuDetailComponent, canActivate: [AuthGuardService], resolve: { menu: MenuResolver }, data: { breadcrumb: 'Menu', Title: 'Menu' } }
        , { path: 'menus/:id/edit', component: MenuComponent, canActivate: [AuthGuardService], resolve: { menu: MenuResolver }, data: { breadcrumb: 'Menu', Title: 'Menu' } }
        , { path: 'groups', component: GroupListComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'Group', Title: 'Group' } }
        , { path: 'groups/:id', component: GroupDetailComponent, canActivate: [AuthGuardService], resolve: { group: GroupResolver, menus: MenuListResolver }, data: { breadcrumb: 'Group', Title: 'Group' } }
        , { path: 'groups/:id/edit', component: GroupComponent, canActivate: [AuthGuardService], resolve: { group: GroupResolver, menus: MenuListResolver }, data: { breadcrumb: 'Group', Title: 'Group' } }
        , { path: 'users', component: UserListComponent, canActivate: [AuthGuardService], data: { breadcrumb: 'User', Title: 'User' } }
        , { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuardService], resolve: { user: UserResolver, groups: GroupListResolver }, data: { breadcrumb: 'User', Title: 'User' } }
        , { path: 'users/:id/edit', component: UserComponent, canActivate: [AuthGuardService], resolve: { user: UserResolver, groups: GroupListResolver }, data: { breadcrumb: 'User', Title: 'User' } }
    ];

@NgModule({
    imports: [        
        RouterModule.forChild(routes)
    ],   
    exports: [
        RouterModule
    ]
})
export class UserRoutesModule { }