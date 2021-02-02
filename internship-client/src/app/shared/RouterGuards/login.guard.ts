import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(public router: Router,
              public loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {  
    if(state.url === '/login/google/failure') {
        this.loginService.googleError = true;
        this.router.navigate(['login']);
        return false;
    }

    if(state.url.startsWith('/login/google/success?token=')) {
        const token = route.queryParams['token'];
        const userEmail = route.queryParams['email'];

        if(token && userEmail) {
            this.loginService.saveLoggedInUser(token, userEmail);
            this.router.navigate(['library']);
            return false;
        }

        this.router.navigate(['login']);
        return false;
    }

    return true;
  }
}