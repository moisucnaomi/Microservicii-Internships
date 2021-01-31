import { AREASMAP, LOCATIONSMAP, SEASONSMAP } from "../shared/constants";

export class Internship {
  title: string;
  areaId: string;
  areaName: string;
  seasonId: string;
  seasonName: string;
  locationId: string;
  locationName: string;
  startDate: Date;
  endDate: Date;
  catchDescription: string;
  jobDescription: string;
  company: string;

  constructor(
    title,
    area,
    season,
    location,
    startDate,
    endDate,
    shortDescrption,
    jobDescription,
    company
  ) {
    this.title = title;
    this.areaId = area;
    this.areaName = AREASMAP[area];
    this.seasonId = season;
    this.seasonName = SEASONSMAP[season];
    this.locationId = location;
    this.locationName = LOCATIONSMAP[location];
    this.startDate = startDate;
    this.endDate = endDate;
    this.catchDescription = shortDescrption;
    this.jobDescription = jobDescription;
    this.company = company;
  }
}
