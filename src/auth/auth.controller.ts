import {
  Controller,
  Post,
  Put,
  Delete,
  Req,
  Res,
  Body,
  Param,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  UpdatePassword,
  DeleteAccount,
} from './dto/user.dto';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logIn')
  async logIn(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginUserDto,
  ): Promise<any> {
    try {
      console.log('Login Controller...', body);
      // find user by email
      const user = await this.authService.findUserByEmail(body.email);
      if (user) {
        // check if password match
        const isMatch = await this.authService.matchPassword(
          body.password,
          user.password,
        );
        if (isMatch) {
          console.log('Password Match....', isMatch);
          const { password, ...rest } = user;
          const accessToken = await this.authService.generateAccessToken({
            userId: rest.id,
            email: rest.email,
          });
          res.status(200).json({
            user: { ...rest, accessToken },
            message: 'User Logged In Successfully',
          });
        } else {
          // throw an exception
          throw new UnauthorizedException();
        }
      } else {
        // user does not exist with this email
        res.status(400).json({ message: 'User does not exist with email' });
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('signUp')
  async signUp(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ): Promise<any> {
    const userExist = await this.authService.findUserByEmail(body.email);
    console.log('User Already Exist', userExist);
    if (!userExist) {
      const hashPassword = await this.authService.createPassword(body.password);
      if (hashPassword) {
        const user = await this.authService.createUser({
          ...body,
          password: hashPassword,
        });
        if (user) {
          console.log('Hash Password....', hashPassword);
          res.status(200).json({ ...user });
        }
      }
    }
    res.status(400).json({
      message: 'User Already exist with same email',
    });
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
  @UseGuards(AuthGuard)
  @Put('updatePassword')
  updatePassword(
    @Request() req,
    @Res() res: Response,
    @Body() body: UpdatePassword,
  ): any {
    console.log('Update Password...', req.user);
    res.status(200).json({ ...body });
  }

  @Delete(':id')
  deleteAccount(
    @Request() req,
    @Res() res: Response,
    @Body() body: DeleteAccount,
    @Param('id') id: string,
  ): any {
    console.log('Delete Account...', req.params, 'body...', body);
    res.status(200).json({ ...req.params });
  }
}
