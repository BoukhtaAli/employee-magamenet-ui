import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../../domain-classes/employee/employee";
import {EmployeeServiceService} from "../../../api-services/employee-service/employee-service.service";


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  /*
   Data & Properties.
   */

  employee : Employee = new Employee();
  id : number | undefined;

  /*
   Constructor & Methods.
   */

  constructor(private employeeService : EmployeeServiceService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployeeById();
  }

  private getEmployeeById() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      success => {
        this.employee = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  private gotoEmployeeList(){
    this.router.navigate(["/employees"]);
  }

  onClose() {
    this.gotoEmployeeList();
  }
}
