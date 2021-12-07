import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../api-services/authentication/authentication.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  username : string = "";

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsername();
  }

}
