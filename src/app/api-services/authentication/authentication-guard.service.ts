import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate{

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authenticationService.getToken() !== null) {

      const roles = route.data["roles"];

      if (roles) {

        const match = this.authenticationService.roleMatch(roles);

        if (match) {

          return true;

        } else {

          this.router.navigate(["/forbidden"]);
          return false;
        }
      }
    }

    this.router.navigate(["/login"]);
    return false;
  }

}
