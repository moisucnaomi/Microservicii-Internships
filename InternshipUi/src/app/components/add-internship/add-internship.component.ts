import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatDatepickerModule
} from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AREAS, LOCATIONS, SEASONS } from "src/app/shared/constants";
import { InternshipService } from "src/app/shared/services/internship.service";
import { Internship } from "src/app/models/Internship";
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: "app-add-internship",
  templateUrl: "./add-internship.component.html",
  styleUrls: ["./add-internship.component.css"]
})
export class AddInternshipComponent implements OnInit {
  addInternshipForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;
  areas = AREAS;
  locations = LOCATIONS;
  seasons = SEASONS;
  selectedArea = "1";
  selectedSeason = "1";
  selectedLocation = "1";

  constructor(
    public dialogRef: MatDialogRef<AddInternshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private internshipService: InternshipService,
    private userService: UserService
  ) {
    this.addInternshipForm = this.formBuilder.group({
      internshipTitle: ["", Validators.required],
      shortDescription: ["", Validators.required],
      jobDescription: ["", [Validators.required]]
    });
    this.startDate = new FormControl(new Date());
    this.endDate = new FormControl(new Date());
  }

  onAddClick() {
    let internship = new Internship(
      this.addInternshipForm.controls.internshipTitle.value,
      this.selectedArea,
      this.selectedSeason,
      this.selectedLocation,
      this.startDate.value,
      this.endDate.value,
      this.addInternshipForm.controls.shortDescription.value,
      this.addInternshipForm.controls.jobDescription.value,
      this.userService.getLoggedInUser().companyId
    );
    this.internshipService
      .addInternship(internship)
      .subscribe((result: any) => {
        if (result) {
          this.dialogRef.close();
          this.snackBar.open("Internship Added", "", {
            horizontalPosition: "left",
            duration: 6000
          });
        }
      });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  areaChanged(value: any) {
    this.selectedArea = value;
  }

  seasonChanged(value: any) {
    this.selectedSeason = value;
  }

  locationChanged(value: any) {
    this.selectedLocation = value;
  }

  ngOnInit() {}
}
