import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChronotypeService } from './chronotype.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('chronotype')
export class ChronotypeController {
  constructor(private readonly chronotypeService: ChronotypeService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getChronotype(
    @Param() userId: number
  ) {
    return this.chronotypeService.getChronotype(userId);
  }
}
