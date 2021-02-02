import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Internship } from './internship';

@Injectable()
export class InternshipService {
  private readonly logger = new Logger('Internship Service');

  constructor(@InjectModel('Internship') private readonly model: Model<Internship>) {}


  async getInternshipByID(internshipID: string): Promise<Internship> {
    return await this.model.findById(internshipID);
  }

  async saveInternship(internship: Internship): Promise<Internship> {
    const internshipModel = new this.model(internship);
    return await internshipModel.save();
  }

  async updateInternship(internship: Internship): Promise<Internship> {
    return await this.model.findOneAndUpdate({id: internship.id}, {
      title: internship.title,
      areaId: internship.areaId,
      areaName: internship.areaName,
      seasonId: internship.seasonId,
      seasonName: internship.seasonName,
      locationId: internship.locationId,
      locationName: internship.locationName,
      startDate: internship.startDate,
      endDate: internship.endDate,
      catchDescription: internship.catchDescription,
      jobDescription: internship.jobDescription,
      company: internship.company},
      {upsert: false,  new: true});
  }

  async deleteInternship(internshipID: string) {
    const internship = await this.getInternshipByID(internshipID);

    if(internship)
      await this.model.deleteOne({id: internshipID});
  }
}