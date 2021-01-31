import { IsDate, IsString } from 'class-validator';

export class InternshipDto {
  @IsString() title: string;
  @IsString() areaId: string;
  @IsString() seasonId: string;
  @IsString() locationId: string;
  @IsString() catchDescription: string;
  @IsString() jobDescription: string;
  @IsString() company: string;
  @IsDate() startDate: Date;
  @IsDate() endDate: Date;
}
