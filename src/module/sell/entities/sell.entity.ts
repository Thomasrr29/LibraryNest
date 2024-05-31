import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class sells {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany
    bookId: Number

    @Column()
    date: Date;
}