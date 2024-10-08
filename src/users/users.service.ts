import { Injectable } from '@nestjs/common';
import { UserDto } from './user.Dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
    console.log(this.users);
  }
}
