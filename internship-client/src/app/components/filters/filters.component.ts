import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AREAS, LOCATIONS, SEASONS } from "src/app/shared/constants";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.css"]
})
export class FiltersComponent implements OnInit {
  areas = AREAS;
  locations = LOCATIONS;
  seasons = SEASONS;

  areaSelected = 0;
  locationSelected = 0;
  seasonSelected = 0;
  selected = false;

  @Input() isHR = false;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  isMyInternshipsChanged() {
    this.selected = !this.selected;
    this.onChange();
  }

  onChange() {
    this.update.emit({
      area: this.areaSelected,
      location: this.locationSelected,
      season: this.seasonSelected,
      myInternships: this.selected
    });
  }
}
