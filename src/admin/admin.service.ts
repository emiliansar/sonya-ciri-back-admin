import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async getAdmin(adminId: number) {
        return this.prismaService.admin.findUnique({
            where: {
                id: adminId
            }
        });
    }

    async patchAdmin(dto: PatchAdminDto) {
        const admin = await this.prismaService.admin.findUnique({
            where: {
                id: dto.id
            }
        });

        if (!admin) {
            throw new BadRequestException("Админ не найден")
        }

        return this.prismaService.admin.update({
            where: {
                id: dto.id
            },
            data: {
                unique_name: dto.unique_name,
                first_name: dto.first_name,
                last_name: dto.last_name
            }
        });
    }

    async deleteAdmin(adminId: number) {
        const admin = await this.prismaService.admin.findUnique({
            where: {
                id: adminId
            }
        });

        if (!admin) {
            throw new BadRequestException("Админ не найден")
        }

        return this.prismaService.admin.delete({
            where: {
                id: adminId
            }
        });
    }
}
