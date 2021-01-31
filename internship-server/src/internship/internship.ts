import { IsDate, IsString } from 'class-validator';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Internship implements InMemoryDBEntity {
  @IsString() id: string;
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
