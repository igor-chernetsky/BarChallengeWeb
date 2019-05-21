import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Purchase } from '../entities/purchase';

import { dateToString } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  protected apiUrl = `${process.env.API_URL}/purchases`;
  constructor(
    protected http: Http) { }

  public addPurchase(purchase:Purchase) {
    // TODO - test code
    purchase.id = Math.floor(Math.random() * 10000) + 1;
    purchase.date = dateToString(new Date());

    return this.http.post(this.apiUrl, purchase)
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

  public getClientPurchases(clientId) {
    const url = `${this.apiUrl}?clientId=${clientId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }
}
