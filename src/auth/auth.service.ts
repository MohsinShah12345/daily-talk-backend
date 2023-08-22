import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.authRepository.findOneBy({ email });
    return user;
  }
  async createUser(user: CreateUserDto): Promise<any> {
    console.log('Creating user');
    const userData = this.authRepository.create({
      ...user,
    });
    const createdUser = await this.authRepository.save(userData);
    console.log('User Created', createdUser);
    return createdUser;
  }
  async findUserByFilter(filters: any): Promise<User> {
    const userData = await this.authRepository.findOneBy({ ...filters });
    return userData;
  }
  async createPassword(password: string): Promise<any> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
  async matchPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const bool = await bcrypt.compare(password, hashPassword);
    return bool;
  }
  generateAccessToken = async ({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<string> => {
    console.log('Generate access token', userId, email);
    const accessToken = await this.jwtService.signAsync({ userId, email });
    return accessToken;
  };
}
