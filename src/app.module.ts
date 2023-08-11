import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PSQL_HOST,
      port: parseInt(process.env.PSQL_PORT, 10),
      username: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
