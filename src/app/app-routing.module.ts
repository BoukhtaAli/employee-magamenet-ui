import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import {EmployeeListComponent} from "./components/employee management/employee-list/employee-list.component";
import {HomePageComponent} from "./commons/home-page/home-page.component";
import {EmployeeAddComponent} from "./components/employee management/employee-add/employee-add.component";
import {EmployeeUpdateComponent} from "./components/employee management/employee-update/employee-update.component";
import {EmployeeDetailComponent} from "./components/employee management/employee-detail/employee-detail.component";

const routes : Routes = [
  {
    path : 'employees',
    component : EmployeeListComponent
  },
  {
    path : 'home',
    component : HomePageComponent
  },
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'createEmployee',
    component : EmployeeAddComponent
  },
  {
    path : 'updateEmployee/:id',
    component : EmployeeUpdateComponent
  },
  {
    path : 'getEmployee/:id',
    component : EmployeeDetailComponent
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
