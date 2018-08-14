
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IAdspot } from "../models";

@Injectable()
export class AdspotService {
    private baseUrl = 'api/adspots';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createAdspot(adspot: IAdspot): Observable<IAdspot> {
        adspot.id = undefined;
        return this.http.post(this.baseUrl, adspot)
            //.map(this.extractData)
            .do(data => console.log('createAdspot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateAdspot(adspot: IAdspot): Observable<IAdspot> {
        const url = `${this.baseUrl}/${adspot.id}`;
        return this.http.put(url, adspot)
            //.map(() => adspot)
            .do(data => console.log('updateAdspot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getAdspots(): Observable<IAdspot[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            .do(data => console.log('getAdspots: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
   
    getAdspot(id: number): Observable<IAdspot> {
        if (id === 0) {
            return Observable.of(null);
        };

        const url = `${this.baseUrl}/${id}`;

        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getAdspot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteAdspot(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteAdspot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveAdspot(adspot: IAdspot): Observable<IAdspot> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!adspot.id || isNaN(adspot.id) || adspot.id === 0) {
            return this.createAdspot(adspot);
        }
        return this.updateAdspot(adspot);
    }


}