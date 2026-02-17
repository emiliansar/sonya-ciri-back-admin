import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChronotypeService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getChronotype(userId: number) {
        const chronotype =  this.prisma.chronotype.findUnique({
            where: {
                user_id: userId
            }
        });

        if (!chronotype) {
            throw new NotFoundException('Chronotype not found');
        }

        return chronotype;
    }
}
