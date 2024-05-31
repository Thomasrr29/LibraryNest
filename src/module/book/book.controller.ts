import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/create/new')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get('/get/all')
  findAll(

    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,

  ) {

    return this.bookService.findAllBook(page, limit);
  }

  @Get('/get/by')
  findOneByParam(

    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string,
    @Query('orderField') orderField: string = "id",
    @Query('direction') direction: 'ASC' | 'DESC'

  ) {

    const search = {searchValue, searchField}
    const order = {orderField, direction}

    return this.bookService.findOneBy(search, order);

  }

  @Patch('/update/by')
  updateBy(
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string, 
    @Body() updateBookDto: UpdateBookDto
  ) 
  {
    const search = {searchField, searchValue}
    return this.bookService.update(search, updateBookDto);
  }

  @Delete('/delete/by/:id')
  remove(@Param('id') id: number) {
    return this.bookService.softRemove(+id);
  }
}
