import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { Router } from "@angular/router";
import { Internship } from "src/app/models/Internship";
import { InternshipService } from "src/app/shared/services/internship.service";
import { INTERNSHIPS } from "src/app/shared/constants";

@Component({
  selector: "student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.css"]
})
export class StudentDashboardComponent implements OnInit {
  selectedFields = { area: 0, location: 0, season: 0, myInternships: false };
  internships:Internship[] = [];
  emptyCollection = true;

  constructor(private userService: UserService,
    private internshipService: InternshipService,
    private router: Router
  ) {}

  ngOnInit() {
    this.internshipService.getInternships().subscribe((internships:Internship[]) => {
      this.internships = internships; 
      this.emptyCollection = this.internships.length > 0;
    });
  }

  passesFilters(internship) {
    
    if(this.selectedFields.area != 0 && internship.area.id != this.selectedFields.area.toString())
      return false;

    if(this.selectedFields.location != 0 && internship.location.id != this.selectedFields.location.toString())
      return false;

    if(this.selectedFields.season != 0 && internship.season.id != this.selectedFields.season.toString())
      return false;

    this.emptyCollection = true;
    return true;
  }

  signout() {
    this.userService.forgetUser();
    this.router.navigate([""]);
  }

  onUpdate(value) {
    this.emptyCollection = false;
    this.selectedFields = value;
  }
}
