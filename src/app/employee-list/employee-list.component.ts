import { Component, OnInit } from '@angular/core';
import { Employee } from "../employee";
import { EmployeeServiceService } from "../employee-service.service";
import { faEdit , faEye, faMinus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  /*
   Data & Properties
   */

  employees : Employee[] = [];
  faEdit = faEdit;
  faEye = faEye;
  faMinus = faMinus;

  /*
   Constructor & Methods
   */

  constructor(private employeeService: EmployeeServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  private retrieveEmployees() {
    this.employeeService.getEmployeeList().subscribe(response => {
      this.employees = response;
  });
  }

  updateEmployee(id : number | undefined) {
    this.router.navigate(["/updateEmployee",id]);
  }

  deleteEmployee(id: number | undefined) {
    this.employeeService.deleteEmployeeById(id).subscribe(
      response  => {
        this.retrieveEmployees();
      },
      error => {
        console.log(error);
      }
    );
  }

  getEmployee(id: number | undefined) {
    this.router.navigate(["/getEmployee",id]);
  }

  gotoAddEmployee() {
    this.router.navigate(["/createEmployee"]);
  }
}
