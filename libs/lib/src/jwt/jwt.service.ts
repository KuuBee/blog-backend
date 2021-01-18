import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LibJwtService extends PassportStrategy(Strategy) {
  constructor() {
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
}
