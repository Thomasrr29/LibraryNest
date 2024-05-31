import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateSellDto {


    @IsString()
    @IsNotEmpty()
    seller: string;

    @IsString()
    @IsNotEmpty()
    client: string;

    @IsNumber()
    @IsNotEmpty()
    bookId: Number

    @IsDate()
    @IsNotEmpty()
    date: Date;
}