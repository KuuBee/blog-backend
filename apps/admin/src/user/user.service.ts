import { Body, Injectable } from '@nestjs/common';
import { ResponseService } from '@app/lib/service/response.service';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { IndexUserDTO } from '@app/lib/dto/user/index.dto';
import { CreateAdminUserDTO } from '@app/lib/dto/user/cteate.dto';
import bcrypt from 'bcrypt';
import { LibJwtService } from '@app/lib/service/jwt.service';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '@app/lib/service/utils.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
    private _pagination: PaginationService,
    private _libJwtService: LibJwtService,
    private _config: ConfigService,
    private _utils: UtilsService,
  ) {}
  async index(query: IndexUserDTO) {
    const data = await this._pagination.pagination({
      queryBuilder: this._userRepository
        .createQueryBuilder('user')
        .select([
          'user.name',
          'user.avatar',
          'user.createdAt',
          'user.updatedAt',
          'user.status',
        ])
        .orderBy({
          'user.createdAt': 'DESC',
        }),
      page: query.page,
      pageSize: query.pageSize,
    });
    return this._responseService.success({
      data,
    });
  }
  async create(body: CreateAdminUserDTO) {
    const { name, email, password, vipCode } = body;
    if (vipCode !== this._config.get<string>('VIP_CODE')) return;
    const findOne = await this._userRepository.findOne({
      name,
      email,
    });
    if (findOne)
      return this._responseService.error({
        message: '用户重复',
      });
    const encryptPassword = await bcrypt.hash(password, 10);
    const insertOne = await this._userRepository.insert({
      ...this._utils.omit(body, 'vipCode'),
      avatar: 'https://autocode.icu/assets/images/blog-avatar/root.webp',
      password: encryptPassword,
      level: 200,
    });
    return this._responseService.success({
      message: '注册成功！',
      data: this._libJwtService.createToken({
        name,
        userId: insertOne.identifiers[0].userId,
        avatar: null,
      }),
    });
  }
}
