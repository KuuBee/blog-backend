import { DateService } from '@app/lib/date/date.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'shared/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>,
    private _dateService: DateService,
  ) {}
  findAll(): Promise<User[]> {
    return this._usersRepository.find();
  }
  findOne(id: string): Promise<User> {
    // this._usersRepository.create()
    // this._usersRepository.update()
    // this._usersRepository.delete()
    return this._usersRepository.findOne(id);
  }
  async create() {
    const res = await this._usersRepository.insert({
      name: 'test1',
      password: 'test',
      email: 'test',
    });
    return res;
  }
  async update(id: number) {
    const updateOne = await this._usersRepository.findOne(id);
    updateOne.name = 'test2';
    updateOne.updated_at = this._dateService.now();
    // console.log('updateOne.updatedAt', new Date());
    console.log('updateOne.updatedAt', this._dateService.now());

    return await this._usersRepository.save(updateOne);
  }
}
