import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  protected apiUrl = `${process.env.API_URL}/providers`;
  constructor(protected http: Http) { }

  public getProviders(id: number) {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getProviderById(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public saveProvider(id, form) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, form).toPromise()
    .then((response) => {
      const res = response.json();
      return res;
    });
  }
}
