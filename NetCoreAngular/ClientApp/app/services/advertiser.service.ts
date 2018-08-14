
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IAdvertiser } from "../models";

@Injectable()
export class AdvertiserService {
    private baseUrl = 'api/advertisers';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.error || 'Server error');
    }

    private createAdvertiser(advertiser: IAdvertiser): Observable<IAdvertiser> {
        advertiser.id = undefined;
        return this.http.post(this.baseUrl, advertiser)
            //.map(this.extractData)
            .do(data => console.log('createAdvertiser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateAdvertiser(advertiser: IAdvertiser): Observable<IAdvertiser> {
        const url = `${this.baseUrl}/${advertiser.id}`;
        return this.http.put(url, advertiser)
            //.map(() => advertiser)
            .do(data => console.log('updateAdvertiser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getAdvertisers(): Observable<IAdvertiser[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            .do(data => console.log('getAdvertisers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
   
    getAdvertiser(id: number): Observable<IAdvertiser> {
        if (id === 0) {
            return Observable.of(null);
        };

        const url = `${this.baseUrl}/${id}`;

        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getAdvertiser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteAdvertiser(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteAdvertiser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveAdvertiser(advertiser: IAdvertiser): Observable<IAdvertiser> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!advertiser.id || isNaN(advertiser.id) || advertiser.id === 0) {
            return this.createAdvertiser(advertiser);
        }
        return this.updateAdvertiser(advertiser);
    }


}