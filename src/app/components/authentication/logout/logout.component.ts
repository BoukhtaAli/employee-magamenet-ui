import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../api-services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

}
