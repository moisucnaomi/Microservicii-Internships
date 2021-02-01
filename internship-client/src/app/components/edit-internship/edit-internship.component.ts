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
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'app-edit-internship',
  templateUrl: './edit-internship.component.html',
  styleUrls: ['./edit-internship.component.css']
})
export class EditInternshipComponent implements OnInit {

  addInternshipForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;
  areas = AREAS;
  locations = LOCATIONS;
  seasons = SEASONS;
  selectedArea;
  selectedSeason;
  selectedLocation;

  currentInternship: Internship;

  constructor(
    public dialogRef: MatDialogRef<EditInternshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Internship,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private internshipService: InternshipService,
    private userService: UserService
  ) {
    this.currentInternship = data; 
    this.addInternshipForm = this.formBuilder.group({
      internshipTitle: [this.currentInternship.title, Validators.required],
      shortDescription: [this.currentInternship.catchDescription, Validators.required],
      jobDescription: [this.currentInternship.jobDescription, [Validators.required]]
    });
    this.startDate = new FormControl(new Date(this.currentInternship.startDate));
    this.endDate = new FormControl(new Date(this.currentInternship.endDate));
    this.selectedArea = this.currentInternship.areaId;
    this.selectedSeason = this.currentInternship.seasonId;
    this.selectedLocation = this.currentInternship.locationId;
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
      this.userService.getLoggedInUser().company
    );
    internship.id = this.currentInternship.id;
    this.internshipService
      .updateInternship(internship)
      .subscribe((result: any) => {
        if (result) {
          this.dialogRef.close();
          this.snackBar.open("Internship Updated", "", {
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
