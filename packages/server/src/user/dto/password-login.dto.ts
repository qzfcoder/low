import { IsString, IsNotEmpty } from 'class-validator';
export class PasswordLoginDto {
  @IsString({
    message: 'phone must be a STRING',
  })
  @IsNotEmpty({ message: 'phone is required' })
  phone: string;

  @IsString({
    message: 'password must be a STRING',
  })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
