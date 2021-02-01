import {
  Body,
  Controller,
  Delete,
  Get,
  GoneException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { JwtGuard } from 'src/auth/jwt.guard';
import { Internship } from './internship';
import { InternshipDto } from './internship.dto';
import { InternshipService } from './internship.service';

// @UseGuards(JwtGuard)
@Controller('internship')
export class InternshipController {
  constructor(private readonly internshipService: InternshipService) {}

  @Get()
  async getAllInternships(): Promise<Internship[]> {
    return this.internshipService.getAllInternships();
  }

  @Get(':id')
  async getByID(
    @Param('internshipID') internshipID: string,
  ): Promise<Internship> {
    const internship = this.internshipService.getInternshipByID(internshipID);

    if (!internship) throw new NotFoundException('Internship not found');

    return internship;
  }

  @Post()
  async addInternship(@Body() internship: InternshipDto): Promise<Internship> {
    return this.internshipService.addInternship(
      this.internshipService.dtoToInternship(internship),
    );
  }

  @Put()
  async update(@Body() internship: Internship): Promise<Internship> {
    const databaseInternship = this.internshipService.getInternshipByID(
      internship.id,
    );

    if (!databaseInternship) {
      throw new GoneException();
    }

    return this.internshipService.updateInternship(internship);
  }

  @Delete(':internshipID')
  async deleteInternship(
    @Param('internshipID') internshipID: string,
  ): Promise<void> {
    const internship = this.internshipService.getInternshipByID(internshipID);

    if (!internship) {
      throw new GoneException();
    }

    this.internshipService.deleteInternship(internshipID);
  }
}
