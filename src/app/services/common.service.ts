import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    protected router: Router,
    protected http: Http,
    protected storageService: StorageService) { }

  public logout() {
    this.storageService.remove('authData');
    this.storageService.remove('currentUser');
    this.router.navigate(['/']);
  }

  protected getOptions() {
    const authData = this.getAuthData();
    const token = authData ? `Bearer ${authData.token}` :
      `Bearer ${process.env.PUBLIC_TOKEN}`;
    const headers = new Headers({Authorization: token});
    const options = new RequestOptions({ headers });
    return options;
  }

  protected handleError(error: any) {
    if (process.env.APP_DEBUG) {
      console.error('An error occured', error);
    }

    if (error.status === 403) {
      const responseBody = JSON.parse(error._body);
      const query:any = {};
      this.logout();
    }

    return Promise.reject(error.message || error);
  }

  // ----- private functions -----

  private getAuthData() {
    const authData = this.storageService.get('authData') &&
      JSON.parse(this.storageService.get('authData') as string);
    return authData;
  }
}
