import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { IsString, IsNumber } from 'class-validator';
class dataPayload {
  @IsString()
  name: string;
  @IsNumber()
  age: 23;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  addData(@Body() body: dataPayload): any {
    console.log('Adding Data.....', body);
    return body;
  }
}
