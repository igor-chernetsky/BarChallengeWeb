import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/providers`;
  constructor(protected http: Http,
    protected storageService: StorageService) {
    super(http, storageService);
  }

  public getProviders(id: number) {
    return this.http.get(this.apiUrl, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getProviderById(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public saveProvider(id, form) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, form, this.getOptions())
    .toPromise()
    .then((response) => {
      const res = response.json();
      return res;
    });
  }

  public login(form) {
    const url = `${process.env.API_URL}/providers/login`;
    this.logout();
    return this.http.post(url, form, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        this.storageService.set('currentUser', JSON.stringify(res.data));
        this.storageService.set('authData', JSON.stringify({
          role: 'provider',
          token: res.token
        }));
        return res.data;
      })
      .catch(this.handleError.bind(this));
  }

  public signup(form) {
    const url = `${process.env.API_URL}/providers`;
    this.logout();
    return this.http.post(url, form, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        this.storageService.set('currentUser', JSON.stringify(res.data));
        this.storageService.set('authData', JSON.stringify({
          role: 'provider',
          token: res.token
        }));
        return res.data;
      })
      .catch(this.handleError.bind(this));
  }
}
