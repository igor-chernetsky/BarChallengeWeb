import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CommonService {

   constructor(protected http: Http,
    protected storageService: StorageService) {
    super(http, storageService);
  }

  public getCurrentUser(): any {
    return this.storageService.getStoredObj('currentUser');
  }
}
