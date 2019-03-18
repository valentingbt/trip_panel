import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TooltipComponent } from '@angular/material';

@Injectable()
export class EventService {
    constructor(private http: HttpClient) { }

    public $eventSource = new Subject<any>();

    addEvent(date: Date, name: string, description: string, isDone: boolean, longitude: number, latitude: number): Observable<any> {
        return Observable.create(observer => {
            this.http.post('/addevent', {
                date,
                name,
                description,
                isDone,
                longitude,
                latitude
            }).subscribe((data: any) => {
                observer.next({ event: data.event });
                this.$eventSource.next(event);
                (<any>window).event = event;
            })
        })
    }
}
