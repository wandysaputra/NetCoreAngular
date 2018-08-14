import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse  } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

import { AuthService } from './services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    private count: number = 0;

    constructor(private authService: AuthService, private router: Router, private spinner: Ng4LoadingSpinnerService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //console.log("intercepted request ... ");
        this.count++;

        if (this.count == 1) this.spinner.show();

        // Clone the request to add the new header.
        const authReq = req.clone({
            setHeaders: {                
                Authorization: `Bearer ${this.authService.token}`
            }
        });

        //console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(authReq).do(evt => {
            if (evt instanceof HttpResponse) {
                //console.log('---> status:', evt.status);
                //console.log('---> filter:', req.params.get('filter'));
                this.count--;
                if (this.count == 0) this.spinner.hide();
            }
        })
            .catch((error, caught) => {
                //intercept the respons error and displace it to the console
                this.count--;
                console.log("Error Occurred");
                console.log(error);
                //return the error to the method that called it
                this.router.navigateByUrl('/');
                return Observable.throw(error);
            }) as any;
    }
}