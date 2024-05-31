
import { Entity, OneToMany } from "typeorm";
import { Column, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { book } from "src/module/book/entities/book.entity";

@Entity()
export class author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @OneToMany(() => book, (book) => book.author) 
    book: book[]

    @Column()
    genre: string

    @DeleteDateColumn()
    deletedAt?: Date; 

}