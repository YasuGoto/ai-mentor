import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [PrismaModule, GoalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
