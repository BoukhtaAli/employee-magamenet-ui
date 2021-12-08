import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../api-services/authentication/authentication.service";
import {NgForm} from "@angular/forms";
import {User} from "../../../domain-classes/login/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  login(loginForm : NgForm){
    this.authenticationService.authenticate(loginForm.value);
  }
}
