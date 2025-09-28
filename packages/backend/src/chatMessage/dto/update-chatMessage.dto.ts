import { PartialType } from '@nestjs/mapped-types';
import { CreateChatMessageDto } from './create-chatMessage.dto';

export class UpdateChatMessageDto extends PartialType(CreateChatMessageDto) {}
