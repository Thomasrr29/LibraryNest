import { author } from "src/module/author/entities/author.entity";
import { Book } from "src/module/book/entities/book.entity";
import { Column, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class Sells {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Book, (book) => book.sells)
    @JoinColumn()
    book: Book;
  
    @ManyToOne(() => author, (author) => author.sells)
    @JoinColumn()
    author: author;
  
    @Column()
    date: Date;
  
    @Column()
    clientName: string;
}