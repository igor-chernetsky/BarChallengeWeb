import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    protected http: Http,
    protected storageService: StorageService) { }

  public login(form) {
    const url = `${process.env.API_URL}/customers`;
    this.logout();
    return this.http.post(url, form)
      .toPromise()
      .then((response) => {
        const res = response.json();
        this.storageService.set('currentUser', JSON.stringify(res));
        this.storageService.set('authData', JSON.stringify({
          role: 'customer',
          token: res.token
        }));
        return res;
      });
  }

  public providerLogin(form) {
    const url = `${process.env.API_URL}/providerlogin`;
    this.logout();
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        this.storageService.set('currentUser', JSON.stringify(res));
        this.storageService.set('authData', JSON.stringify({
          role: 'provider',
          token: res.token
        }));
        return res;
      });
  }

  public getCurrentUser(): any {
    return this.storageService.getStoredObj('currentUser');
  }

  public logout() {
    this.storageService.remove('authData');
    this.storageService.remove('currentUser');
  }
}
