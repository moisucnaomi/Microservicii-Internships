import { IsBase64, IsDate, IsInt, IsString } from 'class-validator';
import { Document } from 'mongoose';

export class Internship extends Document {
  @IsString() id: string;
  @IsString() title: string;
  @IsString() areaId: string;
  @IsString() areaName: string;
  @IsString() seasonId: string;
  @IsString() seasonName: string;
  @IsString() locationId: string;
  @IsString() locationName: string;
  @IsDate() startDate: Date;
  @IsDate() endDate: Date;
  @IsString() catchDescription: string;
  @IsString() jobDescription: string;
  @IsString() company: string
} 