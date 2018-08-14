import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService } from './auth.service';

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser } from "../models";

@Injectable()
export class UserService {
    private baseUrl = 'api/users';
    

    constructor(private http: HttpClient, private authService: AuthService) {
        
    }

    private extractData(response: HttpResponse<IUser>) {
        let body = response.body;
        console.log('response::' + body);
        return body || {};
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createUser(user: IUser): Observable<IUser> {
        user.id = undefined;
        return this.http.post(this.baseUrl, user)
            //.map(this.extractData)
            .do(data => console.log('createUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateUser(user: IUser): Observable<IUser> {
        const url = `${this.baseUrl}/${user.id}`;
        return this.http.put(url, user)
            //.map(() => user)
            .do(data => console.log('updateUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getUsers(): Observable<IUser[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            .do(data => console.log('getUsers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUser(id: string): Observable<IUser> {
        if (!id) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteUser(id: string): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveUser(user: IUser): Observable<IUser> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });

        if (!user.id) {
            return this.createUser(user);
        }
        return this.updateUser(user);
    }


}