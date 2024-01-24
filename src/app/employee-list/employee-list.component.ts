import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employees$: Observable<Employee[]>;
  search :string = "";

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  protected readonly of = of;
  selectedEmployee?: Employee;

  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
  }

  public resetSelectedEmployee() : void {
    this.selectedEmployee = undefined;
    this.fetchData();
  }

  showAll() {
    //in this case go back to the top (refresh page like)
    this.search = "";
  }

  addEmployee() {
    //show add employee screen
    this.selectedEmployee = new Employee();
  }

  contentChanged(event: Event) {
    //search employees for matches and highlight them. if search bar is empty dont highlight anything
    this.search = (event.target as HTMLInputElement).value;
  }

  foundViaSearch(employee :Employee) {
    if (this.search !== "")
    {
      if (employee.firstName !== undefined && employee.lastName !== undefined && employee.firstName.concat(" ", employee.lastName).toLowerCase().search(this.search.toLowerCase()) !== -1)
      {
        return "selectedViaSearch";
      }
    }
    return "normalized";
  }

  delete(employee: Employee) {
    //call database
    let response = this.http.delete<Employee>(`http://localhost:8089/employees/${employee.id}/`);
    console.log(response);
  }

  add(employee: Employee) {
    let response = this.http.post<Employee>(`http://localhost:8089/employees`,
      {
        "lastName": `${employee.lastName}`,
        "firstName": `${employee.firstName}`,
        "street": `${employee.street}`,
        "postcode": `${employee.postcode}`,
        "city": `${employee.city}`,
        "phone": `${employee.phone}`,
        "skillSet": [
          0
        ]
        },
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
    console.log(response);
  }

  update(employee: Employee) {
    let observableskills = this.http.get<number[]>(`http://localhost:8089/employees/${employee.id}/qualifications`);
    let skills: number[] = [];
    let promise = observableskills.forEach(skillArr => {skills = skillArr});
    let response = this.http.put<Employee>(`http://localhost:8089/employees/${employee.id}/`,
      {
        "lastName": `${employee.lastName}`,
        "firstName": `${employee.firstName}`,
        "street": `${employee.street}`,
        "postcode": `${employee.postcode}`,
        "city": `${employee.city}`,
        "phone": `${employee.phone}`,
        "skillSet": skills,
        },
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
    console.log(response);
  }
}
