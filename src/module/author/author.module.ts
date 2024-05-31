import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
