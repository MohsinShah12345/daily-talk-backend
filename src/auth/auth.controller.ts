import {
  Controller,
  Post,
  Put,
  Delete,
  Req,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  UpdatePassword,
  DeleteAccount,
} from './dto/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logIn')
  async logIn(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginUserDto,
  ): Promise<any> {
    console.log('Login Controller...', body);
    const user = await this.authService.findUserByFilter({ email: body.email });
    console.log('User Found', user);
    res.status(200).json(req.body);
  }

  @Post('signUp')
  signUp(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ): any {
    console.log('Sign Up', body);

    res.status(200).json({ ...req.body });
  }

  @Post('forgotPassword')
  forgotPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ForgotPasswordDto,
  ): any {
    console.log('Forgot...', req.body);
    res.status(200).json({ ...req.body });
  }

  @Put('updatePassword')
  updatePassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UpdatePassword,
  ): any {
    console.log('Update Password...', body);
    res.status(200).json({ ...body });
  }

  @Delete(':id')
  deleteAccount(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: DeleteAccount,
    @Param('id') id: string,
  ): any {
    console.log('Delete Account...', req.params, 'body...', body);
    res.status(200).json({ ...req.params });
  }
}
