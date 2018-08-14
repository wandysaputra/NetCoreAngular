import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    constructor(private http: Http) {

    }

    token: string = localStorage.getItem('token') || '';
    tokenExpiration: Date;

    get loginRequired(): boolean {     
        this.token = localStorage.getItem('token') || '';
        this.tokenExpiration = new Date(localStorage.getItem('tokenExpiration'));
        
        return this.token.length == 0 || this.tokenExpiration < new Date();
    }

    get username(): string {
        return localStorage.getItem('username') || '';
    }

    login(creds) {
        return this.http.post("/account/token", creds)
            .map(response => {
                let tokenInfo = response.json();

                this.token = tokenInfo.token;
                this.tokenExpiration = tokenInfo.expiration;
                localStorage.setItem('token', tokenInfo.token);
                localStorage.setItem('tokenExpiration', tokenInfo.expiration);
                localStorage.setItem('username', tokenInfo.username);

                return true;
            });
    }

    logout(): void {
        localStorage.clear();
    }

}