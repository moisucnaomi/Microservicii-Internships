import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.forgetUser();
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  registerUser() {
    this.router.navigate(["register"]);
  }

  loginUser(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const auth = {
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value
    };
    this.userService.authenticate(auth).subscribe((result: any) => {
      if (result != null) {
        this.userService.setUserToken(result.access_tokern);
        this.userService.setUser(result.currentUser);
        this.router.navigate(["hr-dashboard"]);
        // if (result.roleId == 1) {
        //   this.router.navigate(["hr-dashboard"]);
        // } else {
        //   this.router.navigate(["student-dashboard"]);
        // }
      }
    });
  }
}
