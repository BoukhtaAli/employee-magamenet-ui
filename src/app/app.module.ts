import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee management/employee-list/employee-list.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { EmployeeAddComponent } from './components/employee management/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee management/employee-update/employee-update.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeDetailComponent } from './components/employee management/employee-detail/employee-detail.component';
import {MaxLengthDirective} from "./custom-validation/max-length-directive/string-max-length.directive";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { NOTYF, notyfFactory } from './api-services/notyf/notyf.token';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ForbiddenComponent } from './components/authentication/forbidden/forbidden.component';
import {AuthenticationGuardService} from "./api-services/authentication/authentication-guard.service";
import {ClientInterceptor} from "./api-services/authentication/client.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HomePageComponent,
    AppHeaderComponent,
    AppFooterComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    EmployeeDetailComponent,
    MaxLengthDirective,
    ConfirmationDialogComponent,
    LoginComponent,
    LogoutComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http, './assets/i18n/', '.json')},
        deps : [HttpClient]
      }
    })
  ],
  providers: [
    { provide: NOTYF, useFactory: notyfFactory },
    {provide : HTTP_INTERCEPTORS , useClass : ClientInterceptor , multi : true},
    AuthenticationGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

