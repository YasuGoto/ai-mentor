import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // e2eテストなどで使う用（任意）　後で修正する
  // async enableShutdownHooks(app: INestApplication) {
  //   type PrismaEvent = 'query' | 'info' | 'warn' | 'error' | 'beforeExit';
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}
