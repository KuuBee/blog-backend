import { TestDto } from 'shared/dto/test';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDTO } from '@app/lib/dto/auth/create.dto';
import bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('授权')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post()
  async create(@Body() body: CreateAuthDTO) {
    return this._authService.create(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  test() {
    // return this._authService.test();
    return 'success';
  }
  // @Post('register')
  // @ApiOperation({ summary: '注册' })
  // register(@Body() dto: TestDto) {
  //   return dto;
  // }
  // @Post('login')
  // @ApiOperation({ summary: '登陆' })
  // login() {
  //   return {
  //     success: true,
  //   };
  // }

  // @Get('user')
  // @ApiOperation({ summary: '用户信息' })
  // userDetail() {
  //   return true;
  // }
}
