import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class StorageService {

  constructor(private localStorage: LocalStorageService) { }

  public get(key: string): any {
    return this.localStorage.retrieve(key);
  }

  public set(key: string, value: string) {
    this.localStorage.store(key, value);
  }

  public remove(key: string) {
    this.localStorage.clear(key);
  }

  public has(key: string): boolean {
    return this.localStorage.retrieve(key) !== undefined;
  }

  public getStoredObj(key: string) {
    let data;
    if (this.get(key)) {
      data = JSON.parse(this.get(key) as string);
    }

    return data;
  }

  public getUserConfig(customerId) {
    const config: any = this.getStoredObj('userConfig') || {};
    return config[customerId] || {};
  }

  public saveUserConfig(userConfig, customerId) {
    const config: any = this.getStoredObj('userConfig') || {};
    config[customerId] = userConfig;
    this.set('userConfig', JSON.stringify(config));
  }
}
