import { IsNumber, IsNotEmpty } from 'class-validator';
export class FindUserDto {
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: 'id must be a number',
    },
  )
  @IsNotEmpty({ message: 'id is required' })
  id: String;
}
