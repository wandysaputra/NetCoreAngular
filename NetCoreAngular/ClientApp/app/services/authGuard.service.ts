
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService  implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { };

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        console.log("AuthGuardService ");
        if (this.authService.loginRequired) {
            //window.alert("You don't have permission to view this page");
            window.alert("Session expired. Please login.");
            this.router.navigate(['/login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        } else {            
            return true;
        }
    }
}