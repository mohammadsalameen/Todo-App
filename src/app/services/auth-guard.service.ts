import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor() { }
  authService = inject(AuthService);
  router = inject(Router);
  canActivate(): boolean {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/auth']);
      return false
    }
    return true;
  }
}