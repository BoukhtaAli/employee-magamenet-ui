import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../api-services/authentication/authentication.service";

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  ngOnInit(): void {
  }

  supportedLanguages = ['fr', 'en'];

  constructor(private translateService: TranslateService, private authenticationService : AuthenticationService) {

    this.translateService.addLangs(this.supportedLanguages);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();

    if(browserLang){
      this.translateService.use(browserLang);
    }
  }

  changeLocale(event : any){
    this.translateService.use(event.target.value);
  }

  isLoggedIn(){
    return this.authenticationService.isUserLoggedIn();
  }

  roleMatch(roles : any){
    return this.authenticationService.roleMatch(roles)
  }
}
