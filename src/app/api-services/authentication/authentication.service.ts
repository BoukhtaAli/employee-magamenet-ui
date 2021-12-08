import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {NotyfService} from "../notyf/notyf.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl : string = "http://localhost:6060";

  constructor(private httpClient : HttpClient, private notyfService: NotyfService, private router: Router) { }

  authenticate(login: any) {

    this.httpClient.post<any>(`${this.baseUrl}`+"/login", login, {observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {

        console.log(response);

        this.setData(response.body.user.roles, response.body.user.username, response.body.accessToken);

        this.router.navigate(["/"]);
        this.notyfService.showNotyf("success", "Login Success!");
      }
    );
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('access_token');
    return !(user === null && token === null);
  }

  logout(){
    sessionStorage.clear();
  }

  public setData(roles : [], username: string, token: string){
    sessionStorage.setItem("roles", JSON.stringify(roles));
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("access_token", token);
  }

  public getRoles() : [] {
    return JSON.parse(<string> sessionStorage.getItem("roles"));
  }

  public getToken(): string{
    return <string> sessionStorage.getItem("access_token");
  }

  public getUsername(): string{
    return <string> sessionStorage.getItem("username");
  }

  public roleMatch(allowedRoles : []): boolean {

    let isMatch = false;
    const userRoles: any = this.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].role === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
