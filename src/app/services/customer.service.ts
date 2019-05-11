import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { StorageService } from './storage.service';
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  protected apiUrl = `${process.env.API_URL}/customer`;
  constructor(
    protected http: Http,
    protected storageService: StorageService) { }
}
