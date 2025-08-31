import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatMessageDto } from './dto/create-chatMessage.dto';
import { UpdateChatMessageDto } from './dto/update-chatMessage.dto';

@Injectable()
export class ChatMessageService {
  constructor(private readonly prisma: PrismaService) {}

  create(goalId: number, dto: CreateChatMessageDto) {
    return this.prisma.chatMessage.create({
      data: {
        goalId: goalId,
        message: dto.message,
      },
    });
  }

  findAll(goalId: number) {
    return this.prisma.chatMessage.findMany({
      where: { goalId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: number) {
    const chatMessage = await this.prisma.chatMessage.findUnique({
      where: { id },
    });
    if (!chatMessage) throw new NotFoundException('chatMessage not found');
    return chatMessage;
  }

  async update(id: number, dto: UpdateChatMessageDto) {
    // 既存のchatMessage取得
    const existingChatMessage = await this.prisma.chatMessage.findUnique({
      where: { id },
    });
    if (!existingChatMessage) {
      throw new NotFoundException('chatMessage not found');
    }

    try {
      return await this.prisma.chatMessage.update({
        where: { id },
        data: {
          message: dto.message,
        },
      });
    } catch {
      throw new NotFoundException('chatMessage not found');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.chatMessage.delete({ where: { id } });
      return { id, deleted: true };
    } catch {
      throw new NotFoundException('chatMessage not found');
    }
  }
}
