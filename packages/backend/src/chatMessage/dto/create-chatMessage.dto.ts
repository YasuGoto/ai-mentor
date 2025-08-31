import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChatMessageDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  goalId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  message: string;
}
