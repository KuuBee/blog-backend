import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller()
@ApiTags('默认')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getHello() {
    return await this.adminService.getHello();
  }
}
