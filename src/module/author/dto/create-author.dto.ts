import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    books: string

    @IsString()
    @IsNotEmpty()
    genre: string
}