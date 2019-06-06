import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Purchase } from '../entities/purchase';

import { dateToString } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/purchases`;
  constructor(protected http: Http,
    protected storageService: StorageService) {
    super(http, storageService);
  }

  public addPurchase(purchase:Purchase) {
    const params = {
      customerId: purchase.customerId,
      productId: purchase.product.id,
    }
    return this.http.post(this.apiUrl, params, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getProviderPurchases(providerId) {
    const url = `${this.apiUrl}?provider.id=${providerId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public removePurchase(purchaseId: number) {
    const url = `${this.apiUrl}/${purchaseId}`;
    return this.http.delete(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getClientPurchases(customerId) {
    const url = `${this.apiUrl}?clientId=${customerId}`;
    return this.http.get(this.apiUrl, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }
}
