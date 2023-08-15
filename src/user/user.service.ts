import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
  async addUser(user: User): Promise<User> {
    const userData = await this.userRepository.save({ ...user });
    return userData;
  }
}
