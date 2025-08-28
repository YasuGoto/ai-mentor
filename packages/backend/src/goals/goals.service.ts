import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number | null, dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        userId, // 認証導入前は null でもOK
        title: dto.title,
        description: dto.description,
        targetDate: new Date(dto.deadline),
      },
    });
  }

  findAll(userId: number | null) {
    return this.prisma.goal.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) throw new NotFoundException('Goal not found');
    return goal;
  }

  async update(id: number, dto: UpdateGoalDto) {
    // 既存のGoalを取得
    const existingGoal = await this.prisma.goal.findUnique({ where: { id } });
    if (!existingGoal) {
      throw new NotFoundException('Goal not found');
    }

    try {
      return await this.prisma.goal.update({
        where: { id },
        data: {
          title: dto.title,
          description: dto.description,
          targetDate: dto.deadline
            ? new Date(dto.deadline)
            : existingGoal.targetDate,
          status: existingGoal.status,
        },
      });
    } catch {
      throw new NotFoundException('Goal not found');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.goal.delete({ where: { id } });
      return { id, deleted: true };
    } catch {
      throw new NotFoundException('Goal not found');
    }
  }
}
