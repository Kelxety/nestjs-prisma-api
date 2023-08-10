import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService],
  imports: [PrismaModule],
})
export class ListingsModule {}
