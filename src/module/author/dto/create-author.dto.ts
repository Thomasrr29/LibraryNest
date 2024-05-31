import { IsNotEmpty, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateAuthorDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}