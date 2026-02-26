import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto, SigninAdminDto } from './dto/admin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async signup(dto: CreateAdminDto) {
        if (!dto.first_name ||
            !dto.last_name ||
            !dto.unique_name
        ) {
            throw new UnauthorizedException("Отсутствует имя, фамилия или уникальное имя");
        }

        const unique_name = await this.prisma.admin.findUnique({
            where: {
                unique_name: dto.unique_name
            }
        });

        if (unique_name) {
            throw new UnauthorizedException("Это уникальное имя уже занято");
        }

        const admin = await this.prisma.admin.create({
            data: {
                ...dto
            }
        });

        return this.signin(admin)
    }

    async signin(dto: SigninAdminDto): Promise<{
        id: number,
        unique_name?: string,
        access_token: string,
        refresh_token: string,
    }> {
        if (!dto.first_name ||
            !dto.last_name ||
            !dto.unique_name
        ) {
            throw new UnauthorizedException("Отсутствует имя, фамилия или уникальное имя");
        }

        const admin = await this.prisma.admin.findUnique({
            where: {
                unique_name: dto.unique_name
            }
        });

        if (!admin) {
            throw new UnauthorizedException("Админа с таким уникальным именем не существует");
        }

        const payload = { sub: admin.id, unique_name: admin.unique_name };

        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_EXPIRE_IN', '1h'),
        });

        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('REFRESH_JWT_SECRET'),
            expiresIn: this.configService.get('REFRESH_JWT_EXPIRE_IN', '1d'),
        });

        return {
            ...admin,
            id: +admin.id,
            unique_name: admin.unique_name,
            access_token,
            refresh_token,
        }
    }

    async getProfile(adminId: number) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId }
        });

        if (!admin) {
            throw new UnauthorizedException('Админ не найден');
        }

        return admin;
    }

    async refreshToken(adminId: number) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId }
        });

        if (!admin) {
            throw new UnauthorizedException('Не верный токен')
        }

        const newAccessToken = await this.jwtService.signAsync(
            { sub: admin.id, unique_name: admin.unique_name },
            { expiresIn: this.configService.get('JWT_EXPIRE_IN', '1h') }
        );

        return {
            access_token: newAccessToken,
            id: admin.id,
            unique_name: admin.unique_name,
        };
    }
}
