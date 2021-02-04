import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '../entity/user.entity';
import { ResponseService } from './response.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LibJwtService extends PassportStrategy(Strategy) {
  constructor(
    private _responseService: ResponseService,
    private _jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO 修改密钥值环境变量
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    // 如果token解码成功就会走到这里
    return { userId: payload.sub, username: payload.username };
  }

  createToken(findOne: UserEntity) {
    const payload = { username: findOne.name, sub: findOne.userId };
    const { name, avatar } = findOne;
    return {
      accessToken: this._jwtService.sign(payload),
      name,
      avatar,
    };
  }
}
