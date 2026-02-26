import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AuthService],
})
export class AdminModule {}
