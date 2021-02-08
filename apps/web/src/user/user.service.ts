import { CreateUserDTO } from '@app/lib/dto/user/cteate.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { ResponseService } from '@app/lib/service/response.service';
import { UtilsService } from '@app/lib/service/utils.service';
import { GlobalType } from '@app/lib/interface';
import { LibService } from '@app/lib';
import { ConfigService } from '@nestjs/config';
import { LibJwtService } from '@app/lib/service/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
    private _utilsService: UtilsService,
    private _libService: LibService,
    private _configService: ConfigService,
    private _libJwtService: LibJwtService,
  ) {}
  testId = 0;

  // TODO 需要删除
  async findAll() {
    const data = await this._userRepository.find();
    return this._responseService.success({
      data,
    });
  }
  // TODO 需要删除
  findOne(id: string): Promise<UserEntity> {
    return this._userRepository.findOne(id);
  }

  // 创建
  async create(body: CreateUserDTO, file: GlobalType.UploadFile) {
    const findOne = await this._userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name: body.name })
      .orWhere('user.email = :email', { email: body.email })
      .getOne();
    if (findOne)
      return this._responseService.error({
        code: HttpStatus.CONFLICT,
        message: '昵称或邮箱已被占用',
      });
    let savePath: string;
    const password = await bcrypt.hash(body.password, 10);
    console.log('body', body);

    if (body.defaultAvatar) {
      savePath = body.defaultAvatar;
    } else {
      const md5 = crypto.createHash('md5');
      const result = md5.update(body.name).digest('hex');
      const fileName = result;
      savePath = await this._libService.uploadFile({
        file,
        savePath: this._configService.get<string>('AVATAR_PATH'),
        fileName,
      });
    }
    const createOne = {
      avatar: savePath,
      password,
      ...this._utilsService.omit(body, 'defaultAvatar', 'password'),
    };
    console.log('createOne', createOne);

    const insertOne = await this._userRepository.insert(createOne);
    // 创建完毕 生成token
    return this._responseService.success({
      data: this._libJwtService.createToken({
        ...createOne,
        userId: insertOne.identifiers[0].userId,
      } as UserEntity),
    });
  }

  // TODO 需要删除
  async update(id: number) {
    const updateOne = await this._userRepository.findOne(id);
    updateOne.name = 'test4' + this.testId;
    this.testId += 1;
    return await this._userRepository.save(updateOne);
  }
}
