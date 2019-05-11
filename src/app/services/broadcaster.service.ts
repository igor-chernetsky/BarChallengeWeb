import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface BroadcastEvent {
    key: any;
    data?: any;
}

@Injectable()
export class BroadcasterService {
    private _eventBus: Subject<BroadcastEvent>;

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    public broadcast(key: any, data?: any) {
        this._eventBus.next({key, data});
    }

    public on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable()
            .pipe(filter((event) => event.key === key))
            .pipe(map((event) => event.data as T));
    }
}
