
import { Entity, JoinColumn, OneToMany } from "typeorm";
import { Column, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { Book } from "src/module/book/entities/book.entity";
import { Sells } from "src/module/sell/entities/sell.entity";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
  
    @OneToMany(() => Sells, (sells) => sells.author)
    sells: Sells[];
}