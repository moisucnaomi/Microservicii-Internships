import { Component, Input, Output,EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { InternshipDetailsComponent } from "../internship-details/internship-details.component";

@Component({
  selector: "internship-card",
  templateUrl: "./internship-card.component.html",
  styleUrls: ["./internship-card.component.css"]
})
export class InternshipCardComponent {
  @Input() internship;
  @Output() updateList= new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log("internship", this.internship);
  }

  onClick() {
    const dialogRef = this.dialog.open(InternshipDetailsComponent, {
      width: "450px",
      data: this.internship
    });
    dialogRef.afterClosed().subscribe(result => this.updateList.emit(''));
  }
}
