import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/products`;
  constructor(protected http: Http,
    protected storageService: StorageService) {
    super(http, storageService);
  }

  public getProducts(id: number) {
    return this.http.get(this.apiUrl, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      }).catch(this.handleError.bind(this));
  }

  public getProductById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      }).catch(this.handleError.bind(this));
  }

  public getProductsByProvider(providerId: string) {
    const url = `${this.apiUrl}/provider/${providerId}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      }).catch(this.handleError.bind(this));
  }

  public saveProduct(product) {
    if (!product.id) {
      return this.http.post(this.apiUrl, product, this.getOptions())
        .toPromise()
        .then((response) => {
          const res = response.json();
          return res;
        }).catch(this.handleError.bind(this));
     } else {
      const url = `${this.apiUrl}/${product.id}`;
      return this.http.put(url, product, this.getOptions())
        .toPromise()
        .then((response) => {
          const res = response.json();
          return res;
        }).catch(this.handleError.bind(this));
     }
  }

  public removeProduct(productId) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url, this.getOptions())
      .toPromise()
      .then((response) => {
        if (response.status === 202) {
          return 'success';
        }
        return 'failure';
      }).catch(this.handleError.bind(this));
  }
}
