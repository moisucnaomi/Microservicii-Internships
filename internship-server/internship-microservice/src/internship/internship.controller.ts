import { Body, Controller, Delete, Get, GoneException, Logger, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { Internship } from "./internship";
import { InternshipService } from "./internship.service";

@Controller('internships')
@ApiTags('auth')
export class InternshipController {
    private readonly logger = new Logger("Internship Controller");

    constructor(private readonly internshipService: InternshipService) {}

    @MessagePattern('getInternshipByID')
    @Get('/internshipID/:internshipID')
    async getByID(@Param('internshipID') internshipID: string): Promise<Internship> {
        this.logger.log("getByID method called - internshipID: " + internshipID);

        const internship = this.internshipService.getInternshipByID(internshipID);

        if (!internship) { 
            this.logger.log("Internship not found!");
            throw new NotFoundException("Internship not found");   
        }
                
        this.logger.log("Result: " + internship);

        return internship;
    }

    @MessagePattern('addInternship')
    @Post()
    async addInternship(@Body() internship: Internship): Promise<Internship> {
        this.logger.log("addInternship method called - internship: " + internship);

        if(!internship.id)
            internship.id = uuidv4();
            
        const savedInternship = await this.internshipService.saveInternship(internship);

        this.logger.log("Internship saved");

        return savedInternship;
    }

    @MessagePattern('updateInternship')
    @Put()
    async update(@Body() internship: Internship): Promise<Internship> {
        this.logger.log("update method called - internship: " + internship);

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
        this.logger.log("deleteInternship method called - internshipID: " + internshipID);

        const internship = this.internshipService.getInternshipByID(internshipID);

        if (!internship) {
            this.logger.log("Internship not found!");
            throw new GoneException();
        }
        
        await this.internshipService.deleteInternship(internshipID);

        this.logger.log("Internship deleted!");
    }
}