import { IsString, IsNotEmpty } from 'class-validator';
export class PhoneLoginDto {
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
}
