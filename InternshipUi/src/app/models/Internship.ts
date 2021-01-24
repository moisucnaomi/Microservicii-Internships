export class Internship {
  Title: string;
  AreaId: string;
  SeasonId: string;
  LocationId: string;
  StartDate: Date;
  EndDate: Date;
  CatchDescription: string;
  JobDescription: string;
  CompanyId: string;

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
    this.Title = title;
    this.AreaId = area;
    this.SeasonId = season;
    this.LocationId = location;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.CatchDescription = shortDescrption;
    this.JobDescription = jobDescription;
    this.CompanyId = company;
  }
}
