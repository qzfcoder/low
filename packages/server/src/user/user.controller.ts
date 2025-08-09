import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CaptchaUserDto } from './dto/captcha-user';

import { GetUserIP, GetUserDevice } from 'src/utils/getUserMessTool';
import { SecretTool } from 'src/utils/secretTool';
import { TextMessageTool } from 'src/utils/textMessageTool';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly secretTool: SecretTool,
    private readonly textMessageTool: TextMessageTool,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  findAll(@GetUserIP() ip: string, @GetUserDevice() device: string) {
    return { ip, device };
  }

  @Post('captcha')
  async getCaptcha(
    @Body() body: CaptchaUserDto,
    @GetUserIP() ip: string,
    @GetUserDevice() device: string,
  ) {
    const { type } = body;
    // 用户的ip喝设备加密
    const _key = this.secretTool.getSecret(ip + device);
    return this.userService.getCaptcha(_key, type);
  }

  // 短信验证码接口，未做，需要第三方短信服务，这里只是模拟
  @Post('sendCode')
  async sendCode() {
    const phone = '12345678901';
    const randomCode = 123456;
    let res = await this.textMessageTool.sendMsgCode(phone, randomCode);
    return res.code!;
    // return this.userService.sendCode(phone);
  }
}
