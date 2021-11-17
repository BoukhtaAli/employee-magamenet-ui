import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee management/employee-list/employee-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './commons/home-page/home-page.component';
import { AppHeaderComponent } from './commons/app-header/app-header.component';
import { AppFooterComponent } from './commons/app-footer/app-footer.component';
import { EmployeeAddComponent } from './components/employee management/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee management/employee-update/employee-update.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeDetailComponent } from './components/employee management/employee-detail/employee-detail.component';
import {MaxLengthDirective} from "./custom-validation/max-length-directive/string-max-length.directive";
import { ConfirmationDialogComponent } from './commons/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

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
    ConfirmationDialogComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

