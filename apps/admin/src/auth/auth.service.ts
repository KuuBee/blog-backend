import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateAuthDTO } from '@app/lib/dto/auth/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ResponseService } from '@app/lib/service/response.service';
import { LibJwtService } from '@app/lib/service/jwt.service';
import { find } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
    private _libJwtService: LibJwtService,
  ) {}
  async create(data: CreateAuthDTO) {
    console.log('data', data);

    const findOne = await this._userRepository.findOne({
      name: data.name,
    });
    if (findOne) {
      if (findOne.level !== 200)
        throw this._responseService.error({
          code: HttpStatus.FORBIDDEN,
          message: '没权限嗨搁着给爷登陆呢？给爷爬！',
        });
      if (await bcrypt.compare(data.password, findOne.password)) {
        return this._responseService.success({
          data: {
            ...this._libJwtService.createToken(findOne),
            userId: findOne.userId,
          },
        });
      }
    }
    throw this._responseService.error({
      code: HttpStatus.FORBIDDEN,
      message: '账号或密码不正确',
    });
  }
}
