import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateSellDto {
    readonly bookId: number;
    readonly authorId: number;
    readonly date: Date;
    readonly clientName: string;
}