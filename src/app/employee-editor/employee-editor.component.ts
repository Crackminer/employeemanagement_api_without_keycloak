import {Component, Input} from '@angular/core';
import {Employee} from "../Employee";
import {EmployeeListComponent} from "../employee-list/employee-list.component";

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent {

  @Input() employee?: Employee;
  ogEmployee: Employee = new Employee();
  isDisabled = true;

  constructor(private listComponent: EmployeeListComponent) {
    this.isDisabled = true;
  }

  back() {
    //according to our wireframe this currently is the wrong behaviour
    this.employee = undefined;
    this.isDisabled = true;
    this.listComponent.resetSelectedEmployee();
  }

  edit(employee: Employee) {
    //make buttons editable
    //make other buttons visible and hide some buttons
    this.isDisabled = false;
    this.ogEmployee = employee;
  }

  delete() {
    //call database to delete
  }

  all() {
    this.employee = undefined;
    this.isDisabled = true;
    this.listComponent.resetSelectedEmployee();
  }

  save() {
    //call database to add new employee or to update existing employee
    if (this.employee !== undefined)
    {
      if (this.ogEmployee.id === new Employee().id)
      {
        //add new employee
      }
      else
      {
        //update existing employee
      }
      //run acknowledgement window

      //on successful acknowledge go back to  detail view if edited and go back to all view if added
      if (this.ogEmployee.id === new Employee().id)
      {
        //added new employee
        this.back();
      }
      else
      {
        //updated existing employee
        this.ogEmployee = this.employee;
        this.isDisabled = true;
      }
    }
  }

  undo() {
    //get rid of user input
    this.employee = this.ogEmployee;
  }
}
