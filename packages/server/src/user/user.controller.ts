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
import { SendCodeDto } from './dto/sendCode';
import { RegisterDto } from './dto/register.dto';
import { PasswordLoginDto } from './dto/password-login.dto';
import { PhoneLoginDto } from './dto/phone-login.dto';

import { GetUserIP, GetUserDevice } from 'src/utils/getUserMessTool';
import { SecretTool } from 'src/utils/secretTool';
import { TextMessageTool } from 'src/utils/textMessageTool';
import { MathRandomTool } from 'src/utils/mathRandomTool';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly secretTool: SecretTool,
    private readonly textMessageTool: TextMessageTool,
    private readonly mathRandomTool: MathRandomTool,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

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
  /**
   * 发送验证码的方法
   * 该方法用于向指定手机号发送验证码，并返回发送结果的状态码
   */
  @Post('sendCode')
  async sendCode(
    @Body() body: SendCodeDto,
    @GetUserIP() ip: string,
    @GetUserDevice() device: string,
  ) {
    const { type, phone, captcha } = body;

    const _key = this.secretTool.getSecret(ip + device);
    console.log('sendCode');
    return this.userService.sendCode(
      phone,
      captcha,
      type,
      _key,
      this.mathRandomTool.randomCode(),
    );
    // // 定义手机号常量
    // const phone = '12345678901';
    // // 定义随机验证码常量
    // const randomCode = 123456;
    // // 调用短信工具发送验证码，并获取发送结果
    // let res = await this.textMessageTool.sendMsgCode(phone, randomCode);
    // // 返回发送结果的状态码
    // return res.code!;
    // // 注释掉的代码：另一种实现方式，通过用户服务发送验证码
    // // return this.userService.sendCode(phone);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { phone, sendCode, password, confirm } = body;
    // 验证验证码是否正确
    const result = await this.userService.register(
      phone,
      sendCode,
      password,
      confirm,
    );
    if (!result) {
      return { code: 400, message: '验证码错误' };
    }
    return result;
  }

  // 账号密码登录
  @Post('passwordLogin')
  async passwordLogin(@Body() body: PasswordLoginDto) {
    const { phone, password } = body;
    return this.userService.passwordLogin(phone, password);
  }

  // 手机验证码登录
  @Post('phoneLogin')
  async phoneLogin(
    @Body() body: PhoneLoginDto,
    @GetUserIP() ip: string,
    @GetUserDevice() device: string,
  ) {
    const { phone, sendCode } = body;
    return this.userService.phoneLogin(phone, sendCode);
  }
}
