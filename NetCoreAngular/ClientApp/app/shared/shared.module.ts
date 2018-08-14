import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';//TODO: need to remove from auth.service
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../http.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,        
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        NgxPaginationModule,     
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FilterPipe,
    ],
    declarations: [
        FilterPipe,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true
        }
    ]
})
export class SharedModule { }
