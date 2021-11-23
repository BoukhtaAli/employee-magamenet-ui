import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  //Hard Coded Authentication

  authenticate(username: string, password:string) : boolean{

    if(username === 'zerthue' && password === 'zerthue'){
      sessionStorage.setItem('username',username);
      return true;
    }else{
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem('username');
  }
}
