import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AuthorService {

  constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>){}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto); 
    return await this.authorRepository.save(author);
  }

  async findAll(page: number, limit: number) {

    try {
      const queryBuilder = this.authorRepository.createQueryBuilder('author')
      .skip((page - 1) * limit)
      .take(limit)
  
      const [results, total] = await queryBuilder.getManyAndCount()
  
      return {
  
        data: results,
        count: total,
        CurrentPage: page,
        totalPages: Math.ceil(total/limit) 
  
      }

    } 
    
    catch(error){

        throw new Error(error)

    }
    
  }

  async findOneBy(
    search: {searchField: string, valueField: string}, 
    order: {orderField: string, direction: 'ASC' | 'DESC'},
  ){

    try {
      const {searchField, valueField} = search
      const {orderField, direction} = order
  
      return await this.authorRepository.createQueryBuilder('authorFind')
      .where(`authorFind.${searchField} ILIKE :value`, {value: `%${valueField}%`})
      .orderBy(`authorFind.${orderField}`, direction)
      .getMany();
      ;
    } catch(error){

      throw new NotFoundException(`${error}, Error`)

    }
   
  }

  async update( 
    search: {searchValue: string | number, searchField: string | number}, 
    updateAuthorDto: UpdateAuthorDto) {

    const {searchValue, searchField} = search

    return await this.authorRepository.createQueryBuilder('author')
    .update('author') // Where I going to update 
    .set(updateAuthorDto) // What values I will update in my table 
    .where(`author.${searchField} = :searchValue`, {searchValue}) //The ubication conditional 
    .execute(); //Execute 
  }

  async softRemoveId(id: number): Promise<Author> {

    const author = await this.authorRepository.findOneBy({id})

    if(!author){
      throw new NotFoundException(`Author not found with the error ${id}`)
    }
    return this.authorRepository.softRemove(author)
  }
}
