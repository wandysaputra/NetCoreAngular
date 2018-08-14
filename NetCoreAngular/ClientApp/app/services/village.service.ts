
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IVillage } from "../models";

@Injectable()
export class VillageService {
    private baseUrl = 'api/villages';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createVillage(regency: IVillage): Observable<IVillage> {
        regency.id = undefined;
        return this.http.post(this.baseUrl, regency)
            //.map(this.extractData)
            .do(data => console.log('createVillage: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateVillage(regency: IVillage): Observable<IVillage> {
        const url = `${this.baseUrl}/${regency.id}`;
        return this.http.put(url, regency)
            //.map(() => regency)
            .do(data => console.log('updateVillage: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getVillages(): Observable<IVillage[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            //.do(data => console.log('getVillages: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getVillagesByDistrict(id: number): Observable<IVillage[]> {
        const url = `${this.baseUrl}/GetByDistrict/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getVillages by district: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getVillage(id: number): Observable<IVillage> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getVillage: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteVillage(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteVillage: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveVillage(regency: IVillage): Observable<IVillage> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!regency.id || isNaN(regency.id) || regency.id === 0) {
            return this.createVillage(regency);
        }
        return this.updateVillage(regency);
    }


}