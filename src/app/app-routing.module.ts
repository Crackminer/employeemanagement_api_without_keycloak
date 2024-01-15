import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{EmployeeListComponent} from "./employee-list/employee-list.component";

/*
* Hier wird festgelegt, dass wenn man auf localhost:4200 geht, man direkt auf localhost:4200/employees weiter geleitet wird
* und man dort die Liste aller Employees findet, die mit employee-list.component.html und .ts beschrieben sind
*/
const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
