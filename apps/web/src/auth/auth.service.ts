import { CreateAuthDTO } from '@app/lib/dto/auth/create.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ResponseService } from '@app/lib/response/response.service';
import { JwtService } from '@nestjs/jwt';
import { find } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
    private _jwtService: JwtService,
  ) {}
  async create(data: CreateAuthDTO) {
    const findOne = await this._usersRepository.findOne({
      name: data.name,
    });
    if (findOne) {
      if (await bcrypt.compare(data.password, findOne.password)) {
        const payload = { username: findOne.name, sub: findOne.userId };
        const { name, avatar } = findOne;
        return this._responseService.success({
          data: {
            accessToken: this._jwtService.sign(payload),
            name,
            avatar,
          },
          message: '登陆成功',
        });
      }
    }
    throw this._responseService.error({
      code: HttpStatus.FORBIDDEN,
      message: '账号或密码不正确',
    });
  }
}
