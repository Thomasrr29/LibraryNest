import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { author } from "src/module/author/entities/author.entity";

@Entity()
export class book {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'book_name'})
    bookName: string;

    @ManyToOne(() => author, (author) => author.book )
    author: number;

    @DeleteDateColumn()
    deletedAt?: Date; 
    

}