import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Purchase } from '../entities/purchase';

import { dateToString } from '../utils';
@Injectable({
  providedIn: 'root'
})
export class RewardService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/rewards`;
  constructor(
    protected router: Router,
    protected http: Http,
    protected storageService: StorageService) {
    super(router, http, storageService);
  }

  public getProviderRewards(providerId) {
    const url = `${this.apiUrl}/provider/${providerId}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getCustomerRewards(customerId) {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public setReward(data) {
    return this.http.post(this.apiUrl, data, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }
}