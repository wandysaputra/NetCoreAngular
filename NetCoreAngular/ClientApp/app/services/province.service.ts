import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService } from './auth.service';

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProvince } from "../models";

@Injectable()
export class ProvinceService {
    private baseUrl = 'api/provinces';
    

    constructor(private http: HttpClient, private authService: AuthService) {
        
    }

    //private extractData(response: HttpResponse<IProvince>) {
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

    private createProvince(province: IProvince): Observable<IProvince> {
        province.id = undefined;
        return this.http.post(this.baseUrl, province)
            //.map(this.extractData)
            .do(data => console.log('createProvince: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProvince(province: IProvince): Observable<IProvince> {
        const url = `${this.baseUrl}/${province.id}`;
        return this.http.put(url, province)
            //.map(() => province)
            .do(data => console.log('updateProvince: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getProvinces(): Observable<IProvince[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            //.do(data => console.log('getProvinces: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProvince(id: number): Observable<IProvince> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getProvince: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteProvince(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteProvince: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProvince(province: IProvince): Observable<IProvince> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!province.id || isNaN(province.id) || province.id === 0) {
            return this.createProvince(province);
        }
        return this.updateProvince(province);
    }


}