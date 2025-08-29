import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() dto: CreateGoalDto) {
    const userId: number | null = null; // 認証導入前は null で作成
    return this.goalsService.create(userId, dto);
  }

  @Get()
  findAll() {
    // 認証導入後は JWT から userId を取り出してフィルタ
    return this.goalsService.findAll(null);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.goalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateGoalDto) {
    return this.goalsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.goalsService.remove(id);
  }
}
