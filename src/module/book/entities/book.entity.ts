import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "src/module/author/entities/author.entity";
import { Sells } from "src/module/sell/entities/sell.entity";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name:'book_name'})
    bookName: string;
  
    @ManyToOne(() => Author, (author) => author.books)
    author: Author;
  
    @OneToMany(() => Sells, (sells) => sells.book)
    sells: Sells[];
  
    @DeleteDateColumn()
    deletedAt?: Date;

}