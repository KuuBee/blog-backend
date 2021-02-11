import { CreateAdminUserDTO } from '@app/lib/dto/user/cteate.dto';
import { IndexUserDTO } from '@app/lib/dto/user/index.dto';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('用户API')
@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @ApiOperation({ summary: '用户列表' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(@Query() data: IndexUserDTO) {
    return this._userService.index(data);
  }

  // @Post()
  // create(@Body() body: CreateAdminUserDTO) {
  //   return this._userService.create(body);
  // }
}
