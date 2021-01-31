import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/User";
import { UserService } from "src/app/shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  days: Array<number> = [];
  months: Array<string> = [];
  years: Array<number> = [];
  degrees: Array<any> = [];
  isHR = true;
  day = this.days[0];
  month = this.months[0];
  year = this.years[0];
  degree = "1";
  fileInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
        email: ["", [Validators.required, Validators.email]],
        summary: [""],
        company: [""]
      },
      { validators: this.matchPassword }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.userService.forgetUser();
    this.generateData();
  }

  private matchPassword(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.get("password").value;
    const confirmPassword = group.get("confirmPassword").value;

    return password === confirmPassword ? null : { notSame: true };
  }

  generateData(): void {
    this.degrees = [
      { Id: "1", Name: "High School" },
      { Id: "2", Name: "Bachelor" },
      { Id: "3", Name: "Master" },
      { Id: "4", Name: "Phd" }
    ];
    const date = new Date();
    const year = date.getFullYear();
    for (let i = 1900; i < year; i++) {
      this.years.push(i);
    }

    for (let i = 1; i < 32; i++) {
      this.days.push(i);
    }

    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Decembre"
    ];
  }

  isHRChanged(event) {
    this.isHR = event.srcElement.checked;
  }

  fileUploaded(file) {
    this.fileInfo = file.item(0);
  }

  degreeChanged(value) {
    this.degree = value.Id;
  }

  dayChanged(value) {
    this.day = value;
  }

  monthChanged(value) {
    this.month = value;
  }

  yearChanged(value) {
    this.year = value;
  }

  returnToLogin() {
    this.router.navigate([""]);
  }

  registerUser() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user = new User();
    user.firstName = this.registerForm.get("firstName").value;
    user.lastName = this.registerForm.get("lastName").value;
    user.email = this.registerForm.get("email").value;
    user.password = this.registerForm.get("password").value;
    // user.Summary = this.registerForm.get('summary').value;
    // user.Date = new Date();
    // user.Date.setFullYear(this.year);
    // user.Date.setMonth(parseInt(this.month, 10));
    // user.Date.setDate(this.day);
    // user.Degree =  this.degree;
    if (this.isHR) {
      user.roleId = "1";
      user.company = this.registerForm.get("company").value;
    } else {
      user.roleId = "2";
    }
    this.userService.addUser(user).subscribe((result: any) => {
      this.userService.setUser(result);
      if (!result) {
        this.router.navigate(["login"]);
      }
    });
  }
}
