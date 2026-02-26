import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async search(
    @Query('text') text: string,
  ) {
    return await this.searchService.search(text);
  }
}
