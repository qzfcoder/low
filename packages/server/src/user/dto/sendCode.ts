import { IsString, IsNotEmpty } from 'class-validator';
export class SendCodeDto {
  @IsString({
    message: 'type must be a STRING',
  })
  @IsNotEmpty({ message: 'type is required' })
  type: string;

  @IsString({
    message: 'phone must be a STRING',
  })
  @IsNotEmpty({ message: 'phone is required' })
  phone: string;
  
  @IsString({
    message: 'phone must be a STRING',
  })
  @IsNotEmpty({ message: 'phone is required' })
  captcha: string;
}
