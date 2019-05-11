import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  protected apiUrl = `${process.env.API_URL}/challenges`;
  constructor(protected http: Http) { }

  public getChallenges() {
    const url = this.apiUrl;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getChallengeById(challengeId) {
    const url = `${process.env.API_URL}/challenges/${challengeId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
  }

  public getUserChallenges(userId) {
    const url = `${process.env.API_URL}/userChallenges/${userId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res ? res.challenges : [];
      });
  }

  public getProviderChallenges(providerId) {
    const url = `${process.env.API_URL}/challenges?providerId=${providerId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        const res = response.json();
        return res;
      });
    }
}
