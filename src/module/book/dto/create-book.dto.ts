import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Entity } from "typeorm";


@Entity()
export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    bookName: string;

    @IsNumber()
    @IsNotEmpty()
    author: number;

}
