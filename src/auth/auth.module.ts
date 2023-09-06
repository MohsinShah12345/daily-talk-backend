import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule } from '../email/email.module';
@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'abcdefghijklmnopqrstuvwxyz',
      signOptions: { expiresIn: '7d' },
    }), // registering jwt
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, // making all routes private
  ],
  exports: [AuthService],
})
export class AuthModule {}
