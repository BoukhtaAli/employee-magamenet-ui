import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import {EmployeeListComponent} from "./components/employee management/employee-list/employee-list.component";
import {HomePageComponent} from "./commons/home-page/home-page.component";
import {EmployeeAddComponent} from "./components/employee management/employee-add/employee-add.component";
import {EmployeeUpdateComponent} from "./components/employee management/employee-update/employee-update.component";
import {EmployeeDetailComponent} from "./components/employee management/employee-detail/employee-detail.component";
import {LoginComponent} from "./components/authentication/login/login.component";
import {LogoutComponent} from "./components/authentication/logout/logout.component";
import {AuthenticationGuardService} from "./api-services/authentication/authentication-guard.service";

const routes : Routes = [
  {
    path : 'employees',
    component : EmployeeListComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path : 'home',
    component : HomePageComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'logout',
    component : LogoutComponent
  },
  {
    path : 'createEmployee',
    component : EmployeeAddComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path : 'updateEmployee/:id',
    component : EmployeeUpdateComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path : 'getEmployee/:id',
    component : EmployeeDetailComponent,
    canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
