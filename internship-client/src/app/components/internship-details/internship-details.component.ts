import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from "@angular/material";
import { Internship } from "src/app/models/Internship";
import { InternshipService } from "src/app/shared/services/internship.service";
import { UserService } from "src/app/shared/services/user.service";
import { AddInternshipComponent } from "../add-internship/add-internship.component";
import { EditInternshipComponent } from "../edit-internship/edit-internship.component";

@Component({
  selector: "app-internship-details",
  templateUrl: "./internship-details.component.html",
  styleUrls: ["./internship-details.component.css"]
})
export class InternshipDetailsComponent implements OnInit {
  internship: Internship;
  isEditable: boolean;
  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private internshipService: InternshipService,
    public dialogRef: MatDialogRef<InternshipDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.internship = data;
    this.isEditable = this.userService.getLoggedInUser().company === this.internship.company ? true : false;
    console.log("editable", this.isEditable);
  }

  ngOnInit() {
    console.log("internship", this.internship);
  }

  onApplyClick() {
    this.dialogRef.close();
    this.snackBar.open("Successfully Applied", "", {
      horizontalPosition: "left",
      duration: 6000
    });
  }

  onEditClick() {
    const dialogRef = this.dialog.open(EditInternshipComponent, {data:  this.internship});
    dialogRef.afterClosed().subscribe(() => this.dialogRef.close());
  }

  onDeleteClick() {
    this.internshipService.deleteInternship(this.internship.id).subscribe(_ => {
      this.dialogRef.close();
      this.snackBar.open("Successfully Deleted", "", {
        horizontalPosition: "left",
        duration: 6000
      });
    });
  }

  close() {
    this.dialogRef.close();
  }
}
