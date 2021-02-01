import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Internship } from "../../models/Internship";
import { ApiUrls } from "../ApiUrls";

@Injectable()
export class InternshipService {
  constructor(private httpClient: HttpClient) {}

  addInternship(internship: Internship) {
    return this.httpClient.post(ApiUrls.Internship, internship);
  }

  updateInternship(internship: Internship) {
    return this.httpClient.put(ApiUrls.Internship, internship);
  }

  getInternships() {
    return this.httpClient.get(ApiUrls.Internship);
  }

  deleteInternship(internshipID: string) {
    return this.httpClient.delete(ApiUrls.Internship + '/' + internshipID);
  }
}
