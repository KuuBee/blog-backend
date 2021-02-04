import { CreateAuthDTO } from '@app/lib/dto/auth/create.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'apps/web/src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post()
  create(@Body() body: CreateAuthDTO) {
    return this._authService.create(body);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  test() {
    return 'success';
  }
}
