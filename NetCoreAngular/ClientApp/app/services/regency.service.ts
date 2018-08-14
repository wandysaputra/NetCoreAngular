
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IRegency } from "../models";

@Injectable()
export class RegencyService {
    private baseUrl = 'api/regencies';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createRegency(regency: IRegency): Observable<IRegency> {
        regency.id = undefined;
        return this.http.post(this.baseUrl, regency)
            //.map(this.extractData)
            .do(data => console.log('createRegency: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateRegency(regency: IRegency): Observable<IRegency> {
        const url = `${this.baseUrl}/${regency.id}`;
        return this.http.put(url, regency)
            //.map(() => regency)
            .do(data => console.log('updateRegency: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getRegencies(): Observable<IRegency[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            //.do(data => console.log('getRegencies: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRegenciesByProvince(id: number): Observable<IRegency[]> {
        const url = `${this.baseUrl}/GetByProvince/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getRegencies by province: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRegency(id: number): Observable<IRegency> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getRegency: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteRegency(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteRegency: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveRegency(regency: IRegency): Observable<IRegency> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!regency.id || isNaN(regency.id) || regency.id === 0) {
            return this.createRegency(regency);
        }
        return this.updateRegency(regency);
    }


}