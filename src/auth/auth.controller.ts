import { Controller, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logIn')
  logIn(@Req() req: Request, @Res() res: Response): any {
    console.log('Login Controller...', req.body);
    res.status(200).json(req.body);
  }

  @Post('signUp')
  signUp(@Req() req: Request, @Res() res: Response): any {
    console.log('Sign Up', req.body);
    res.status(200).json({ ...req.body });
  }

  @Post('forgotPassword')
  forgotPassword(@Req() req: Request, @Res() res: Response): any {
    console.log('Forgot...', req.body);
    res.status(200).json({ ...req.body });
  }

  @Put('updatePassword')
  updatePassword(@Req() req: Request, @Res() res: Response): any {
    console.log('Update Password...', req.body);
    res.status(200).json({ ...req.body });
  }

  @Delete(':id')
  deleteAccount(@Req() req: Request, @Res() res: Response): any {
    console.log('Delete Account...', req.params);
    res.status(200).json({ ...req.params });
  }
}
