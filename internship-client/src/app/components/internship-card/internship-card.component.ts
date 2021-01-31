import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { InternshipDetailsComponent } from "../internship-details/internship-details.component";

@Component({
  selector: "internship-card",
  templateUrl: "./internship-card.component.html",
  styleUrls: ["./internship-card.component.css"]
})
export class InternshipCardComponent {
  @Input() internship;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log("internship", this.internship);
  }

  onClick() {
    this.dialog.open(InternshipDetailsComponent, {
      width: "450px",
      data: this.internship
    });
  }
}
