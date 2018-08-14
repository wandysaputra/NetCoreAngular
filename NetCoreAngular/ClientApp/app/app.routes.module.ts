import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ShowPostComponent  } from './show/showPost.component';
import { AuthGuardService } from './services';
import { ShowPostResolver } from './resolves';

let routes: Routes = [        
    { path: 'showPost/:id', component: ShowPostComponent, resolve: { advertiserPost: ShowPostResolver } }
    , { path: '', canActivate: [AuthGuardService], loadChildren: 'app/dashboard/dashboard.module#DashboardModule'}  
    , { path: 'login', component: LoginComponent }    
];

@NgModule({    
    imports: [        
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule { }
