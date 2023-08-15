import { IsString, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}
export class UpdatePassword {
  @IsEmail()
  email: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
export class DeleteAccount {
  @IsString()
  password: string;
}
