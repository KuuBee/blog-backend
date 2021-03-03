import { CreateTokenDTO } from '@app/lib/dto/token/create.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private _token: TokenService) {}

  @Post()
  create(@Body() body: CreateTokenDTO) {
    return this._token.create(body);
  }
}
