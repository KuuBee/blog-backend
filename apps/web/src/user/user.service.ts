import { CreateUserDTO } from '@app/lib/dto/user/cteate.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ResponseService } from '@app/lib/response/response.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
    private _responseService: ResponseService,
  ) {}
  testId = 0;
  async findAll() {
    const data = await this._usersRepository.find();
    return this._responseService.success({
      data,
    });
  }
  findOne(id: string): Promise<UserEntity> {
    return this._usersRepository.findOne(id);
  }
  async create(body: CreateUserDTO) {
    body.password = await bcrypt.hash(body.password, 10);
    await this._usersRepository.insert(body);
  }
  async update(id: number) {
    const updateOne = await this._usersRepository.findOne(id);
    updateOne.name = 'test4' + this.testId;
    this.testId += 1;
    return await this._usersRepository.save(updateOne);
  }
}
