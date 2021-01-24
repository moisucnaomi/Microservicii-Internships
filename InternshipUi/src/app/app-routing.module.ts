import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login-component/login.component";
import { RegisterComponent } from "./components/register-component/register.component";
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard.component";
import { HrDashboardComponent } from "./components/hr-dashboard/hr-dashboard.component";
import { AuthGuard } from "./shared/RouterGuards/auth-guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "student-dashboard",
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "hr-dashboard",
    component: HrDashboardComponent
    // canActivate: [AuthGuard]
  },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
