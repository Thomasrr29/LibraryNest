import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { book } from './entities/book.entity';

@Injectable()
export class BookService {

  constructor(@InjectRepository(book) private readonly bookRepository: Repository<book>){}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  async findAllBook(
    page: number,
    limit: number,
  ) {
    const queryBuilder = this.bookRepository.createQueryBuilder('book')
    .skip((page - 1) * limit)
    .take(limit)
    
    const [results, total] = await queryBuilder.getManyAndCount()

    return {
      data: results,
      totalCount: total,
      currentPage:page,
      pageCount: Math.ceil(total/limit)
    }
  }

  async findOneBy(
    search: {searchValue: string, searchField: string},
    order: {orderField: string, direction: 'ASC' | 'DESC'}
  ) {

    const {searchValue, searchField} = search
    const {orderField, direction}  = order
    
    const queryBuilder = this.bookRepository.createQueryBuilder('book')
    .where(`book.${searchField} ILIKE :value`, {value: `%${searchValue}%`})
    .orderBy(`book.${orderField}`, direction)

    const [results, total] = await queryBuilder.getManyAndCount()

    return {
      data: results,
      total,
    }

  }

  async update(
    search: {searchValue: string, searchField: string},
    updateBookDto: UpdateBookDto
  ){

    const {searchValue, searchField} = search; 
    const validField = ['book_name', 'author']

    if(!validField.includes(searchField)){
      throw new NotFoundException(`The field ${searchField} doesn't exist in the data`)
    }

    return await this.bookRepository.createQueryBuilder('book')
    .update('book')
    .set(updateBookDto)
    .where(`book.${searchField} ILIKE :value`, {value: `%${searchValue}%`})
    .execute();  
  }

  async softRemove(id: number) {

    const book = await this.bookRepository.findOneBy({id})

    if(!book){
      throw new NotFoundException(`Book with the ID: ${id} wasn't found`)
    }

    return this.bookRepository.softDelete(id)
  }
}
