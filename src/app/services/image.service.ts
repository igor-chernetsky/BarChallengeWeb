import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/image`;
  constructor(
    protected router: Router,
    protected http: Http,
    protected storageService: StorageService) {
    super(router, http, storageService);
  }

  public saveImage(form) {
    return this.http.post(this.apiUrl, form, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      })
      .catch(this.handleError.bind(this));
  }

}
