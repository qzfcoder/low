import { IsString, IsNotEmpty } from 'class-validator';
export class CaptchaUserDto {
  @IsString({
    message: 'type must be a STRING',
  })
  @IsNotEmpty({ message: 'type is required' })
  type: string;
}
