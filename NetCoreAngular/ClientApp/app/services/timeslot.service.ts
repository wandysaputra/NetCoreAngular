import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { AuthService } from './auth.service';

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITimeSlot } from "../models";

@Injectable()
export class TimeSlotService {
    private baseUrl = 'api/timeSlots';
    

    constructor(private http: HttpClient, private authService: AuthService) {
        
    }

    //private extractData(response: HttpResponse<ITimeSlot>) {
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

    private createTimeSlot(timeSlot: ITimeSlot): Observable<ITimeSlot> {
        timeSlot.id = undefined;
        return this.http.post(this.baseUrl, timeSlot)
            //.map(this.extractData)
            .do(data => console.log('createTimeSlot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateTimeSlot(timeSlot: ITimeSlot): Observable<ITimeSlot> {
        const url = `${this.baseUrl}/${timeSlot.id}`;
        return this.http.put(url, timeSlot)
            //.map(() => timeSlot)
            .do(data => console.log('updateTimeSlot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    getTimeSlots(): Observable<ITimeSlot[]> {
        return this.http.get(this.baseUrl)
            //.map(this.extractData)
            //.do(data => console.log('getTimeSlots: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getTimeSlot(id: number): Observable<ITimeSlot> {
        if (id === 0) {
            return Observable.of(null);
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getTimeSlot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    deleteTimeSlot(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .do(data => console.log('deleteTimeSlot: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveTimeSlot(timeSlot: ITimeSlot): Observable<ITimeSlot> {
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });        
        if (!timeSlot.id || isNaN(timeSlot.id) || timeSlot.id === 0) {
            return this.createTimeSlot(timeSlot);
        }
        return this.updateTimeSlot(timeSlot);
    }


}