import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../services';

let routes: Routes =
    [
        {
            path: '', canActivate: [AuthGuardService], component: DashboardComponent
            , children: [
                { path: 'userManagement', canActivate: [AuthGuardService], data: { breadcrumb: 'User Management' }, loadChildren: 'app/userManagement/user.module#UserModule' }
                , { path: 'master', canActivate: [AuthGuardService], data: { breadcrumb: 'Master' }, loadChildren: 'app/masters/master.module#MasterModule' }
            ]
        }        
    ];

@NgModule({
    imports: [      
        RouterModule.forChild(routes)
    ]
    , exports: [
        RouterModule
    ]
})
export class DashboardRoutesModule { }