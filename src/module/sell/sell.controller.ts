import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SellService } from './sell.service';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';


@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Post('/create')
  create(@Body() createSellDto: CreateSellDto) {
    return this.sellService.create(createSellDto);
  }

  @Get('/get/all')
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ){
    return this.sellService.findAll(page, limit);
  }

  @Get('/get/by')
  findOneBy(
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC' | 'DESC'
  ){

    const search = {searchField, searchValue}
    const order = {orderField, direction}

    return this.sellService.findOneBy(search, order);
  }

  @Patch('/update')
  update(
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string,
    @Body() updateSellDto: UpdateSellDto) {

    const search = {searchField, searchValue}
    return this.sellService.update(search, updateSellDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.sellService.remove(+id);
  }
}
