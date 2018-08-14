
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IAdvertiserPost } from "../models";

@Injectable()
export class ShowPostService {
    private baseUrl = 'api/showPosts';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('handleError::' + error);
        return Observable.throw(error.error || 'Server error');
    }
   
    showPost(id: number): Observable<IAdvertiserPost> {
        if (id === 0) {
            return Observable.of(null);
        };

        const url = `${this.baseUrl}/${id}`;

        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getAdvertiserPost: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    


}