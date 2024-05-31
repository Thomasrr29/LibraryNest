import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { SellModule } from './sell/sell.module';

@Module({
    

  imports: [AuthorModule, BookModule, SellModule]
})
export class ModuleModule {}
