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
  ogEmployee: Employee | undefined = undefined;
  isDisabled = true;
  showNoDelete: boolean = false;
  showAcknowledgeDelete: boolean = false;
  showErrorSaving: boolean = false;

  constructor(private listComponent: EmployeeListComponent) {
    this.isDisabled = true;
  }

  back() {
    //according to our wireframe this currently is the wrong behaviour
    this.employee = undefined;
    this.ogEmployee = undefined;
    this.isDisabled = true;
    this.listComponent.resetSelectedEmployee();
  }

  edit(employee: Employee) {
    //make buttons editable
    //make other buttons visible and hide some buttons
    this.isDisabled = false;
    this.ogEmployee  = new Employee(employee.id, employee.lastName, employee.firstName, employee.street, employee.postcode, employee.city, employee.phone);
  }

  areYouSureYouWantToDelete()
  {
    this.showAcknowledgeDelete = true;
  }

  delete() {
    this.showAcknowledgeDelete = false;
    if (this.employee === undefined || this.employee.id === undefined)
    {
      this.showNoDelete = true;
      return;
    }
    //call database to delete
    this.listComponent.delete(this.employee);
    this.back();
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
      try {
        if (this.ogEmployee === undefined || this.ogEmployee.id === new Employee().id)
        {
          //add new employee
          this.listComponent.add(this.employee);
        }
        else
        {
          //update existing employee
          this.listComponent.update(this.employee);
        }
      }
      catch {
        //run acknowledgement window
        this.showErrorSaving = true;
        return;
      }
      //on successful acknowledge go back to  detail view if edited and go back to all view if added
      if (this.ogEmployee === undefined || this.ogEmployee.id === new Employee().id)
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

  hideNoDeleteEmployee() {
    this.showNoDelete = false;
  }

  hideAcknowledgeDeleteEmployee() {
    this.showAcknowledgeDelete = false;
  }

  hideErrorSavingEmployee() {
    this.showErrorSaving = false;
  }
}
