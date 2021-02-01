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

  async deleteInternship(internshipID: string) {
    const internship = await this.getInternshipByID(internshipID);

    if(internship)
      await this.model.deleteOne(internshipID);
  }
}