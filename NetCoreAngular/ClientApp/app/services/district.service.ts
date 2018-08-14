
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IDistrict } from "../models";

@Injectable()
export class DistrictService {
    private baseUrl = 'api/districts';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createDistrict(regency: IDistrict): Observable<IDistrict> {
        regency.id = undefined;
        return this.http.post(this.baseUrl, regency)
            //.map(this.extractData)
            .do(data => console.log('createDistrict: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateDistrict(regency: IDistrict): Observable<IDistrict> {
        const url = `${this.baseUrl}/${regency.id}`;
        return this.http.put(url, regency)
            //.map(() => regency)
            .do(data => console.log('updateDistrict: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getDistricts(): Observable<IDistrict[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            //.do(data => console.log('getDistricts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDistrictsByRegency(id: number): Observable<IDistrict[]> {
        const url = `${this.baseUrl}/GetByRegcency/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            //.do(data => console.log('getDistricts by regency: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDistrict(id: number): Observable<IDistrict> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getDistrict: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteDistrict(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteDistrict: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveDistrict(regency: IDistrict): Observable<IDistrict> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!regency.id || isNaN(regency.id) || regency.id === 0) {
            return this.createDistrict(regency);
        }
        return this.updateDistrict(regency);
    }


}