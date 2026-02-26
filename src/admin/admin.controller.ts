import { Body, Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { PatchAdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getAdmin(@Request() req) {
    return this.adminService.getAdmin(req.admin.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('patch')
  async patchProfile(
    @Request() req,
    @Body() dto: PatchAdminDto
  ) {
    return this.adminService.patchAdmin({
      ...dto,
      id: req.admin.sub
    });
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteProfile(@Request() req) {
    return this.adminService.deleteAdmin(req.admin.sub);
  }
}
