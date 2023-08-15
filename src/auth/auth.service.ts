import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const userData = await this.authRepository.create({
      ...user,
    });
    return userData;
  }
  async findUserByFilter(filters: any): Promise<User> {
    const userData = await this.authRepository.findOneBy({ ...filters });
    return userData;
  }
}
