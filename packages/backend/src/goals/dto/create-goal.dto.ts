import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { GoalStatus } from '@prisma/client';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  deadline: string; // ISO 8601 文字列
}
