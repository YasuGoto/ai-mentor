import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatMessageService } from './chatMessage.service';
import { CreateChatMessageDto } from './dto/create-chatMessage.dto';
import { UpdateChatMessageDto } from './dto/update-chatMessage.dto';

@Controller('chatMessage')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Post()
  create(@Param('goalId') goalId: number, @Body() dto: CreateChatMessageDto) {
    return this.chatMessageService.create(goalId, dto);
  }

  @Get()
  findAll(@Param('goalId') goalId: number) {
    return this.chatMessageService.findAll(goalId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chatMessageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateChatMessageDto) {
    return this.chatMessageService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chatMessageService.remove(id);
  }
}
