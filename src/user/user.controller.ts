import { Controller, Get, Put, Req, Res, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Public } from '../auth/auth.metaData';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Get('all')
  async getAllUsers(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.log('Get All Users');
    const users = await this.userService.getAllUsers();
    res.status(200).json({ message: 'All Users Fetched', users });
  }
  @Get('users')
  getSpecificUser(
    @Req() req: Request,
    @Res() res: Response,
    @Query('friends') friends: string[],
  ): any {
    const arr = Array.isArray(friends) ? friends : [...friends];
    console.log('Arrr...', arr);
    // console.log('Get Specific Users...', JSON.parse(req.query.friends));
    res.status(200).json({ ...req.query });
  }

  @Get(':id')
  getUser(@Req() req: Request, @Res() res: Response): any {
    console.log('User by Id...', req.params);
    res.status(200).json({ id: req.params.id });
  }

  @Put()
  async updateUser(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.log('Update User...', req.body);
    const addUser = await this.userService.addUser({ ...req.body });
    console.log('User Added..', addUser);
    res.status(200).json({ ...addUser });
  }

  @Put('users')
  updateUsers(@Req() req: Request, @Res() res: Response): any {
    console.log('Update Users...', req.body);
    res.status(200).json({ ...req.body });
  }
}
