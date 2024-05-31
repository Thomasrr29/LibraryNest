import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Search } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('/create')
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get('/get/all')
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ){
    return await this.authorService.findAll(page, limit);
  }

  @Get('/get/by')
  async findBy(
    @Query('valueField') valueField: string,
    @Query('searchField') searchField: string,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC' | 'DESC',
  ) {

    const search = {valueField, searchField}
    const order = {orderField, direction}
    return await this.authorService.findOneBy(search, order);
  }

  @Patch('/update')
  async updateAuthor(
    @Query('searchValue') searchValue: string, 
    @Query('searchField') searchField: string, 
    @Body() updateAuthorDto: UpdateAuthorDto) {

    const search = {searchValue, searchField}
    return this.authorService.update(search, updateAuthorDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return this.authorService.softRemoveId(+id);
  }
}
