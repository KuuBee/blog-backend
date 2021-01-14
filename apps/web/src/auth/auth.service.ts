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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
  ) {}
  async create(data: CreateAuthDTO) {
    const findOne = await this._usersRepository.findOne({
      name: data.name,
    });
    if (findOne) {
      if (await bcrypt.compare(data.password, findOne.password)) {
        return findOne;
      }
    }
    throw this._responseService.error(HttpStatus.FORBIDDEN, '账号或密码不正确');
  }
}
