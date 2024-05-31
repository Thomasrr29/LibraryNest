import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sells } from './entities/sell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([sells])],
  controllers: [SellController],
  providers: [SellService],
})
export class SellModule {}
