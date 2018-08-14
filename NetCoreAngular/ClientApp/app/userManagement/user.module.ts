import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserRoutesModule } from './user.routes.module';

import {
    UserComponent, UserListComponent, UserDetailComponent
    , MenuComponent, MenuDetailComponent, MenuListComponent
    , GroupComponent, GroupDetailComponent, GroupListComponent
} from '.';

import { UserService, GroupService, MenuService } from '../services';
import { UserResolver, MenuResolver, MenuListResolver, GroupResolver, GroupListResolver } from '../resolves';

@NgModule({
    imports: [
        SharedModule,
        UserRoutesModule
    ]
    , declarations: [        
        UserComponent, UserDetailComponent, UserListComponent
        , GroupComponent, GroupDetailComponent, GroupListComponent
        , MenuComponent, MenuDetailComponent, MenuListComponent        
    ]
    , providers: [
        UserService, GroupService, MenuService
        , UserResolver, MenuResolver, MenuListResolver, GroupResolver, GroupListResolver
    ]
})
export class UserModule { }