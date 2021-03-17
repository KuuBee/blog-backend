import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtSecretKey } from '..';
import { EnvService } from './env/env.service';

export interface JwtValidateInfo {
  userId: number;
  username: string;
}

@Injectable()
export class LibJwtService extends PassportStrategy(Strategy) {
  constructor(private _jwtService: JwtService, private _env: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO 修改密钥值环境变量
      secretOrKey: _env.get('JWT_SECRET_KEY'),
    });
  }

  /**
   * @description: 验证当前token是否为有效值，如果返回falsely即为验证失败，反之亦然
   * @param {any} payload
   * @return {boolean}
   */
  async validate(payload: any): Promise<JwtValidateInfo> {
    // 为了实现登陆更新token的问题
    // 如果token解码成功就会走到这里
    return { userId: payload.sub, username: payload.username };
    // return null;
  }

  createToken(findOne: Pick<UserEntity, 'name' | 'userId' | 'avatar'>) {
    const payload = { username: findOne.name, sub: findOne.userId };
    const { name, avatar } = findOne;
    return {
      accessToken: this._jwtService.sign(payload),
      name,
      avatar,
    };
  }
}
