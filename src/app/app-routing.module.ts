import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {EmployeeAddComponent} from "./employee-add/employee-add.component";
import {EmployeeUpdateComponent} from "./employee-update/employee-update.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";

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
