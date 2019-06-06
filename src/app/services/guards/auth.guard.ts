import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,
  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../storage.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public storageService: StorageService,
    public router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authData = this.storageService.getStoredObj('authData');
    if (authData && authData.role === 'customer') {
      return true;
    } else if (authData && authData.role === 'provider') {
      this.router.navigate(['/profile']);
      return false;
    }
    this.router.navigate(['/']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public storageService: StorageService,
    public router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authData = this.storageService.getStoredObj('authData');
    if (authData && authData.role === 'provider') {
      return true;
    }
    console.log('provider guard');
    this.router.navigate(['/']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotProviderGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public storageService: StorageService,
    public router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authData = this.storageService.getStoredObj('authData');
    if (!authData || authData.role !== 'provider') {
      return true;
    }
    console.log('not provider guard');
    this.router.navigate(['/profile']);
    return false;
  }
}

