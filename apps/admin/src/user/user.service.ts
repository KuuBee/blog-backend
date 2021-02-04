import { Injectable } from '@nestjs/common';
import { ResponseService } from '@app/lib/service/response.service';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { UserIndexDTO } from '@app/lib/dto/user/index.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
    private _pagination: PaginationService,
  ) {}
  async index(query: UserIndexDTO) {
    // console.log(
    //   await this._usersRepository
    //     .createQueryBuilder('user')
    //     .select(['user.userId', 'user.level'])
    //     .getSql(),
    // );
    const data = await this._pagination.pagination({
      queryBuilder: this._usersRepository
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
}
