import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService } from './auth.service';

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IGroup } from "../models";

@Injectable()
export class GroupService {
    private baseUrl = 'api/groups';
    

    constructor(private http: HttpClient, private authService: AuthService) {
        
    }

    //private extractData(response: HttpResponse<IGroup>) {
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

    private createGroup(group: IGroup): Observable<IGroup> {
        group.id = undefined;
        return this.http.post(this.baseUrl, group)
            //.map(this.extractData)
            .do(data => console.log('createGroup: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateGroup(group: IGroup): Observable<IGroup> {
        const url = `${this.baseUrl}/${group.id}`;
        return this.http.put(url, group)
            //.map(() => group)
            .do(data => console.log('updateGroup: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getGroups(): Observable<IGroup[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            .do(data => console.log('getGroups: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getGroup(id: number): Observable<IGroup> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getGroup: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteGroup(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteGroup: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveGroup(group: IGroup): Observable<IGroup> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!group.id || isNaN(group.id) || group.id === 0) {
            return this.createGroup(group);
        }
        return this.updateGroup(group);
    }


}