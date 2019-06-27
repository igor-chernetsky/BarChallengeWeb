import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CommonService {

   constructor(
    protected router: Router,
    protected http: Http,
    protected storageService: StorageService) {
    super(router, http, storageService);
  }

  public getCurrentUser(): any {
    return this.storageService.getStoredObj('currentUser');
  }
}
