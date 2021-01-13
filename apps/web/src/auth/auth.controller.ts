import { TestDto } from 'shared/dto/test';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('授权')
export class AuthController {
  @Post('register')
  @ApiOperation({ summary: '注册' })
  register(@Body() dto: TestDto) {
    return dto;
  }
  @Post('login')
  @ApiOperation({ summary: '登陆' })
  login() {
    return {
      success: true,
    };
  }

  @Get('user')
  @ApiOperation({ summary: '用户信息' })
  userDetail() {
    return true;
  }
}
