import { Body, Controller, Delete, Get, GoneException, Logger, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';
import { JwtGuard } from "./guards/jwt.guard";

import { Internship } from "./internship";
import { InternshipService } from "./internship.service";

@Controller('internships')
@UseGuards(JwtGuard)
@ApiTags('internships')
export class InternshipController {
    private readonly logger = new Logger("Internship Controller");

    constructor(private readonly internshipService: InternshipService) {}

    @MessagePattern('getInternships')
    @Get('')
    async getInternships(): Promise<Internship[]> {
        this.logger.log("Internship - getInternships");

        return await this.internshipService.getInternships();
    }

    @MessagePattern('getInternshipByID')
    @Get('/internshipID/:internshipID')
    async getByID(@Param('internshipID') internshipID: string): Promise<Internship> {
        this.logger.log("Internship - getByID - id: " + internshipID);

        const internship = await this.internshipService.getInternshipByID(internshipID);

        if (!internship) { 
            this.logger.log("Internship not found!");
            throw new NotFoundException("Internship not found");   
        }
                
        this.logger.log("Internship - getByID - result: " + internship.id);

        return internship;
    }

    @MessagePattern('addInternship')
    @Post()
    async addInternship(@Body() internship: Internship): Promise<Internship> {
        this.logger.log("Internship - addInternship - id: " + internship.id);

        if(!internship.id)
            internship.id = uuidv4();
            
        const savedInternship = await this.internshipService.saveInternship(internship);

        this.logger.log("Internship saved");

        return savedInternship;
    }

    @MessagePattern('updateInternship')
    @Put()
    async update(@Body() internship: Internship): Promise<Internship> {
        this.logger.log("Internship - updateInternship - id: " + internship.id);

        const databaseInternship = this.internshipService.getInternshipByID(internship.id);

        if (!databaseInternship) {
            this.logger.log("Internship not found!");
            throw new GoneException();
        }

        const updatedInternship = await this.internshipService.updateInternship(internship);

        this.logger.log("Internship updated");

        return updatedInternship;
    }

    @EventPattern('deleteInternship')
    @Delete(':internshipID')
    async deleteInternship(@Param('internshipID') internshipID: string): Promise<void> {
        this.logger.log("Internship - deleteInternship - id: " + internshipID);

        const internship = this.internshipService.getInternshipByID(internshipID);

        if (!internship) {
            this.logger.log("Internship not found!");
            throw new GoneException();
        }
        
        await this.internshipService.deleteInternship(internshipID);

        this.logger.log("Internship deleted!");
    }
}