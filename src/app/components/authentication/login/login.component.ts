import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../api-services/authentication/authentication.service";
import {NgForm} from "@angular/forms";
import {User} from "../../../domain-classes/login/user";
import {NotyfService} from "../../../commons/js-code/notyf/notyf.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user : User = new User();

  invalidLogin : boolean = false;

  constructor(private router: Router,
              private authenticationService : AuthenticationService,
              private notyfService: NotyfService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  login(loginForm : NgForm){

    if(this.authenticationService.authenticate(loginForm.value.username, loginForm.value.password)){
      this.invalidLogin = false;
      this.router.navigate(["/home"]);
    }else {
      this.invalidLogin = true;
      this.notyfService.showNotyf("error",this.translateService.instant('login-page.form-fields.login-error'));
    }
  }
}
