import { IsString, IsNotEmpty } from 'class-validator';
export class RegisterDto {

  @IsString({
    message: 'phone must be a STRING',
  })
  @IsNotEmpty({ message: 'phone is required' })
  phone: string;
  
  @IsString({
    message: 'sendCode must be a STRING',
  })
  @IsNotEmpty({ message: 'sendCode is required' })
  sendCode: string;

  @IsString({
    message: 'password must be a STRING',
  })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsString({
    message: 'confirm must be a STRING',
  })
  @IsNotEmpty({ message: 'confirm is required' })
  confirm: string;
}
