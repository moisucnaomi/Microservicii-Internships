import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AddInternshipComponent } from "../add-internship/add-internship.component";
import { Internship } from "src/app/models/Internship";
import { InternshipService } from "src/app/shared/services/internship.service";
import { AREASMAP, LOCATIONSMAP, SEASONSMAP } from "src/app/shared/constants";

@Component({
  selector: "app-hr-dashboard",
  templateUrl: "./hr-dashboard.component.html",
  styleUrls: ["./hr-dashboard.component.css"]
})
export class HrDashboardComponent implements OnInit {
  selectedFields = { area: 0, location: 0, season: 0, myInternships: false };
  internships: Internship[] = [];
  emptyCollection = true;

  constructor(
    private userservice: UserService,
    private router: Router,
    private dialog: MatDialog,
    private internshipService: InternshipService
  ) {}

  ngOnInit() {
    this.populateInternships();
  }

  populateInternships() {
    this.internshipService
      .getInternships()
      .subscribe((internships: Internship[]) => {
        this.internships = internships;
        this.internships.map(internship => {
          internship.areaName = AREASMAP[internship.areaId];
          internship.locationName = LOCATIONSMAP[internship.locationId];
          internship.seasonName = SEASONSMAP[internship.seasonId];
        });
        this.emptyCollection = this.internships.length === 0;
      });
  }

  passesFilters(internship) {
    if (
      this.selectedFields.area != 0 &&
      internship.areaId != this.selectedFields.area.toString()
    )
      return false;

    if (
      this.selectedFields.location != 0 &&
      internship.locationId != this.selectedFields.location.toString()
    )
      return false;

    if (
      this.selectedFields.season != 0 &&
      internship.seasonId != this.selectedFields.season.toString()
    )
      return false;

    if (
      this.selectedFields.myInternships == true &&
      internship.company != this.userservice.getLoggedInUser().company
    )
      return false;

    this.emptyCollection = true;
    return true;
  }

  addInternship() {
    const dialogRef = this.dialog.open(AddInternshipComponent, {});

    dialogRef.afterClosed().subscribe(result => this.populateInternships());
  }

  signout() {
    this.userservice.forgetUser();
    this.router.navigate([""]);
  }

  onUpdate(value) {
    this.emptyCollection = false;
    this.selectedFields = value;
  }
}
