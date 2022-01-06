import { CreateTokenDTO } from '@app/lib/dto/token/create.dto';
import { UserEntity } from '@app/lib/entity/user.entity';
import { LibJwtService } from '@app/lib/service/jwt.service';
import { ResponseService } from '@app/lib/service/response.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity) private _repository: Repository<UserEntity>,
    private _response: ResponseService,
    private _jwt: LibJwtService,
  ) {}
  async create(data: CreateTokenDTO) {
    const findOne = await this._repository.findOne(
      {
        name: data.name,
      },
      {
        select: ['level', 'userId', 'password', 'name', 'email', 'avatar'],
      },
    );
    console.log(findOne);

    if (findOne) {
      if (await bcrypt.compare(data.password, findOne.password)) {
        if (findOne.level !== 200)
          return this._response.error({
            code: HttpStatus.FORBIDDEN,
            message: '没权限嗨搁着给爷登陆呢？给爷爬！',
          });
        const { userId, name, email, avatar } = findOne;
        return this._response.success({
          data: {
            ...this._jwt.createToken(findOne),
            userId,
            name,
            email,
            avatar,
          },
        });
      }
    }
    throw this._response.error({
      code: HttpStatus.FORBIDDEN,
      message: '账号或密码不正确',
    });
  }
}
