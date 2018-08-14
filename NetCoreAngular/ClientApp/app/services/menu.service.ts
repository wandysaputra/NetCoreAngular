import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService } from './auth.service';

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IMenu } from "../models";

@Injectable()
export class MenuService {
    private baseUrl = 'api/menus';
    

    constructor(private http: HttpClient, private authService: AuthService) {
        
    }

    //private extractData(response: HttpResponse<IMenu>) {
    //    let body = response.body;
    //    console.log('response::' + body);
    //    return body || {};
    //}

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createMenu(menu: IMenu): Observable<IMenu> {
        menu.id = undefined;
        return this.http.post(this.baseUrl, menu)
            //.map(this.extractData)
            .do(data => console.log('createMenu: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateMenu(menu: IMenu): Observable<IMenu> {
        const url = `${this.baseUrl}/${menu.id}`;
        return this.http.put(url, menu)
            //.map(() => menu)
            .do(data => console.log('updateMenu: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getMenus(): Observable<IMenu[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            .do(data => console.log('getMenus: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMenu(id: number): Observable<IMenu> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getMenu: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteMenu(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteMenu: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveMenu(menu: IMenu): Observable<IMenu> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!menu.id || isNaN(menu.id) || menu.id === 0) {
            return this.createMenu(menu);
        }
        return this.updateMenu(menu);
    }


}