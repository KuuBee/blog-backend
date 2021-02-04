import { UserIndexDTO } from '@app/lib/dto/user/index.dto';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
  index(@Query() data: UserIndexDTO) {
    return this._userService.index(data);
  }
}
