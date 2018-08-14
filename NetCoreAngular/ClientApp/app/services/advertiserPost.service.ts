
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
export class AdvertiserPostService {
    private baseUrl = 'api/advertiserPosts';
    

    constructor(private http: HttpClient) {
        
    }    

    private handleError(error: HttpErrorResponse): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('handleError::' + error);
        return Observable.throw(error.error || 'Server error');
    }

    private prepareSaveData(advertiserPost: IAdvertiserPost): FormData {
      
        let formData = new FormData();

        formData.append("code", advertiserPost.code);
        formData.append("name", advertiserPost.name);
        formData.append("advertiserId", advertiserPost.advertiserId.toString());
        formData.append("activeFrom", advertiserPost.activeFrom.toUTCString());
        formData.append("activeTo", advertiserPost.activeTo.toUTCString());
        formData.append("isActive", advertiserPost.isActive ? 'true' : 'false');
        formData.append("image", advertiserPost.imageUrl);
        formData.append("html", advertiserPost.html);
        formData.append("postTypeId", advertiserPost.postTypeId.toString());
        
        return formData;
    }

    private createAdvertiserPost(advertiserPost: IAdvertiserPost): Observable<IAdvertiserPost> {
        advertiserPost.id = undefined;
        //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        //const options = { headers: new HttpHeaders().set('enctype', 'multipart/form-data') };



        return this.http.post(this.baseUrl, this.prepareSaveData(advertiserPost))
            //.map(this.extractData)
            .do(data => console.log('createAdvertiserPost: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateAdvertiserPost(advertiserPost: IAdvertiserPost): Observable<IAdvertiserPost> {
        const url = `${this.baseUrl}/${advertiserPost.id}`;
        //const options = { headers: new HttpHeaders().set('enctype', 'multipart/form-data') };

        return this.http.put(url, this.prepareSaveData(advertiserPost))
            //.map(() => advertiserPost)
            .do(data => console.log('updateAdvertiserPost: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getAdvertiserPosts(): Observable<IAdvertiserPost[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            .do(data => console.log('getAdvertiserPosts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
   
    getAdvertiserPost(id: number): Observable<IAdvertiserPost> {
        if (id === 0) {
            return Observable.of(null);
        };

        const url = `${this.baseUrl}/${id}`;

        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getAdvertiserPost: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteAdvertiserPost(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteAdvertiserPost: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveAdvertiserPost(advertiserPost: IAdvertiserPost): Observable<IAdvertiserPost> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!advertiserPost.id || isNaN(advertiserPost.id) || advertiserPost.id === 0) {
            return this.createAdvertiserPost(advertiserPost);
        }
        return this.updateAdvertiserPost(advertiserPost);
    }


}