import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected apiUrl = `${process.env.API_URL}/products`;
  constructor(protected http: Http) { }

  public getProducts(id: number) {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getProductById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getProductsByProvider(providerId: string) {
    const url = `${this.apiUrl}/?provider.id=${providerId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public saveProduct(product) {
    if (!product.id) {
      return this.http.post(this.apiUrl, product)
        .toPromise()
        .then((response) => {
          const res = response.json();
          return res;
        });
     } else {
      const url = `${this.apiUrl}/${product.id}`;
      return this.http.put(url, product)
        .toPromise()
        .then((response) => {
          const res = response.json();
          return res;
        });
     }
  }

  public removeProduct(productId) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }
}
