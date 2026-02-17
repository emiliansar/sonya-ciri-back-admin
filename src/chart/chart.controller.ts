import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChartService } from './chart.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getChart(
    @Param('userId') userId: string,
  ) {
    return this.chartService.getChart(+userId);
  }
}
