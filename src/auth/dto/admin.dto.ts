import { IsString, MaxLength } from "class-validator";

export class CreateAdminDto {
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

export class SigninAdminDto {
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

export class ResponseAdminDto {
    id: number
    unique_name: string
    first_name: string
    last_name: string
    created_at: Date
    updated_at: Date
}