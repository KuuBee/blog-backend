import { DateService } from '@app/lib/date/date.service';
import { CreateUserDTO } from '@app/lib/dto/user/cteate.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/lib/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
  ) {}
  findAll(): Promise<UserEntity[]> {
    return this._usersRepository.find();
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
    updateOne.name = 'test2';

    return await this._usersRepository.save(updateOne);
  }
}
