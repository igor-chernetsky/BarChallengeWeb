import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends CommonService {
  protected apiUrl = `${process.env.API_URL}/challenges`;
  constructor(protected http: Http,
    protected storageService: StorageService) {
    super(http, storageService);
  }

  public getChallenges() {
    const url = this.apiUrl;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getChallengeById(challengeId) {
    const url = `${process.env.API_URL}/challenges/${challengeId}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public saveChallenge(challenge) {
    if (!challenge.id) {
      return this.http.post(this.apiUrl, challenge, this.getOptions())
        .toPromise()
        .then((response) => {
          const res = response.json();
          return res;
        });
     } else {
      const url = `${this.apiUrl}/${challenge.id}`;
      return this.http.put(url, challenge, this.getOptions())
        .toPromise()
        .then((response) => {
          const res = response.json();
          return res;
        });
     }
  }

  public removeChallenge(challengeId) {
    const url = `${this.apiUrl}/${challengeId}`;
    return this.http.delete(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getUserChallenges(userId) {
    const url = `${process.env.API_URL}/challenges/customer/${userId}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getProviderChallenges(providerId) {
    const url = `${process.env.API_URL}/challenges/provider/${providerId}`;
    return this.http.get(url, this.getOptions())
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
    }
}
