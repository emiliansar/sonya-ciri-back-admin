import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) {}

    async search(text: string) {
        if (!text || text === '') {
            throw new BadRequestException("Пустой запрос");
        }

        const tag = await this.formatTag(text);

        const results = await this.prisma.user.findMany({
            include: {
                chronoform: {
                    where: {
                        tag
                    }
                },
                chronotypes: true,
                charts: true,
            }
        });

        return results;
    }

    private async formatTag(tag: string) {
        const formattedTag = tag.split('+').join(' ');
        if (formattedTag) {
            return formattedTag;
        }
    }
}
