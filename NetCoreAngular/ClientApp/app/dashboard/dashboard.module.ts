import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { Header, SideBar, Footer, PageBar, PageTitle } from '../layout';


import { DashboardRoutesModule } from './dashboard.routes.module';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutesModule
    ]
    , declarations: [
        Header, SideBar, Footer, PageBar, PageTitle
        ,DashboardComponent
    ]    
})
export class DashboardModule { }