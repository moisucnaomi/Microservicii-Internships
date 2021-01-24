import { CanActivate, Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService,
                private router: Router) {}

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if(this.userService.isUserLoggedIn())
        {
            if(state.url == "/hr-dashboard")
            {
                if(this.userService.getLoggedInUser().roleId == "1")
                    return true;
                else if(this.userService.getLoggedInUser().roleId == "2")
                    this.router.navigate(['student-dashboard']);
            }
            else if(state.url == "/student-dashboard")
            {
                if(this.userService.getLoggedInUser().roleId == "2")
                    return true;
                else if(this.userService.getLoggedInUser().roleId == "1")
                    this.router.navigate(['hr-dashboard']);
            }
        }
        //this.router.navigate(['']);
    }
}