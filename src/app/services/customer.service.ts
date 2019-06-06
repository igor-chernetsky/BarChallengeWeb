import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/customer`;
  constructor(protected http: Http,
    protected storageService: StorageService) {
    super(http, storageService);
  }

  public login(form) {
    const url = `${process.env.API_URL}/customers/login`;
    this.logout();
    return this.http.post(url, form, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        this.storageService.set('currentUser', JSON.stringify(res.data));
        this.storageService.set('authData', JSON.stringify({
          role: 'customer',
          token: res.token
        }));
        return res.data;
      })
      .catch(this.handleError.bind(this));
  }

  public signup(form) {
    const url = `${process.env.API_URL}/customers`;
    this.logout();
    return this.http.post(url, form, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        this.storageService.set('currentUser', JSON.stringify(res.data));
        this.storageService.set('authData', JSON.stringify({
          role: 'customer',
          token: res.token
        }));
        return res.data;
      })
      .catch(this.handleError.bind(this));
  }
}
