import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {

    readonly bookName: string;
    readonly authorId?: number;

}
