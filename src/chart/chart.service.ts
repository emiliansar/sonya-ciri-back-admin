import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getChart(
        userId: number
    ) {
        const chart = await this.prisma.chart.findUnique({
            where: {
                id: userId
            }
        });

        if (!chart) {
            throw new NotFoundException('Chart not found');
        }

        return chart;
    }
}
