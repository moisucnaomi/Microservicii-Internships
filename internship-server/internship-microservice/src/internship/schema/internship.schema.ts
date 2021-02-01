import * as mongoose from 'mongoose';

export const InternshipSchema = new mongoose.Schema({
    id: String,
    title: String,
    areaId: String,
    areaName: String,
    seasonId: String,
    seasonName: String,
    locationId: String,
    locationName: String,
    startDate: Date,
    endDate: Date,
    catchDescription: String,
    jobDescription: String,
    company: String
});