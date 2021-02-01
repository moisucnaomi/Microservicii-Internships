import { Injectable } from '@nestjs/common';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';

import { Internship } from './internship';
import { InternshipDto } from './internship.dto';

@Injectable()
export class InternshipService {
  constructor(
    @InjectInMemoryDBService('internship')
    private readonly database: InMemoryDBService<Internship>,
  ) {}

  getAllInternships(): Internship[] {
    return this.database.getAll();
  }

  getInternshipByID(internshipID: string): Internship {
    return this.database.get(internshipID);
  }

  addInternship(internship: Internship): Internship {
    return this.database.create(internship);
  }

  updateInternship(internship: Internship): Internship {
    this.database.update(internship);
    return internship;
  }

  deleteInternship(internshipID: string) {
    let internship = this.getInternshipByID(internshipID);

    if (internship) this.database.delete(internshipID);
  }

  isDatabaseEmpty() {
    const internships = this.database.getAll();
    return internships.length === 0;
  }

  dtoToInternship(internshipDto: InternshipDto) {
    let internship = new Internship();
    internship.title = internshipDto.title;
    internship.areaId = internshipDto.areaId;
    internship.seasonId = internshipDto.seasonId;
    internship.locationId = internshipDto.locationId;
    internship.catchDescription = internshipDto.catchDescription;
    internship.jobDescription = internshipDto.jobDescription;
    internship.company = internshipDto.company;
    internship.startDate = internshipDto.startDate;
    internship.endDate = internshipDto.endDate;

    return internship;
  }
}
