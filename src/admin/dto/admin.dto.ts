import { IsString, MaxLength } from "class-validator"

export class PatchAdminDto {
    id: number

    @IsString()
    @MaxLength(100)
    unique_name: string

    @IsString()
    @MaxLength(100)
    first_name: string

    @IsString()
    @MaxLength(100)
    last_name: string
}