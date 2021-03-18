import { CreateTokenDTO } from '@app/lib/dto/token/create.dto';
import { UserEntity } from '@app/lib/entity/user.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LibJwtService } from '@app/lib/service/jwt.service';

@Injectable()
export class TokenService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private _libJwt: LibJwtService,
  ) {}

  async create(body: CreateTokenDTO) {
    const findOne = await this._userRepository.findOne(
      {
        name: body.name,
      },
      {
        select: ['name', 'password', 'userId', 'avatar'],
      },
    );
    if (findOne) {
      if (await bcrypt.compare(body.password, findOne.password)) {
        return this._response.success({
          data: this._libJwt.createToken(findOne),
          message: '欢迎',
        });
      }
    }
    return this._response.error({
      code: HttpStatus.FORBIDDEN,
      message: '账号或密码不正确',
    });
  }
}
