import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";

@Component({
  selector: "app-internship-details",
  templateUrl: "./internship-details.component.html",
  styleUrls: ["./internship-details.component.css"]
})
export class InternshipDetailsComponent implements OnInit {
  internship: any;
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<InternshipDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.internship = data;
  }

  ngOnInit() {}

  onApplyClick() {
    this.dialogRef.close();
    this.snackBar.open("Successfully Applied", "", {
      horizontalPosition: "left",
      duration: 6000
    });
  }

  close() {
    this.dialogRef.close();
  }
}
