import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login-component/login.component";
import { RegisterComponent } from "./components/register-component/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorInterceptor } from "./shared/Interceptors/errorinterceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard.component";
import { UserService } from "./shared/services/user.service";
import { InternshipService } from "./shared/services/internship.service";
import { HrDashboardComponent } from "./components/hr-dashboard/hr-dashboard.component";
import { AddInternshipComponent } from "./components/add-internship/add-internship.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { AuthGuard } from "./shared/RouterGuards/auth-guard";
import { InternshipCardComponent } from "./components/internship-card/internship-card.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FiltersComponent } from "./components/filters/filters.component";
import { MatSelectModule } from "@angular/material/select";
import { InternshipDetailsComponent } from "./components/internship-details/internship-details.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StudentDashboardComponent,
    HrDashboardComponent,
    AddInternshipComponent,
    FiltersComponent,
    InternshipCardComponent,
    InternshipDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    InternshipService
  ],
  entryComponents: [AddInternshipComponent, InternshipDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
