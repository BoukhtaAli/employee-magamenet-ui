import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../api-services/authentication/authentication.service";
import {NgForm} from "@angular/forms";
import {User} from "../../../domain-classes/login/user";
import {NotyfService} from "../../../api-services/notyf/notyf.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();

  constructor(private router: Router,
              private authenticationService : AuthenticationService,
              private notyfService: NotyfService) { }

  ngOnInit(): void {
  }

  login(loginForm : NgForm){

    this.authenticationService.authenticate(loginForm.value).subscribe(
      response => {
        this.authenticationService.setData(response.user.roles, response.user.username, response.accessToken);
        this.router.navigate(["/"]);
        this.notyfService.showNotyf("success", "Login Success!");
      });
  }
}
