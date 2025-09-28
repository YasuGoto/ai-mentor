import { Module } from '@nestjs/common';
import { ChatMessageService } from './chatMessage.service';
import { ChatMessageController } from './chatMessage.controller';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
})
export class ChatMessageModule {}
