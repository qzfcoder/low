import { MathRandomTool } from './../utils/mathRandomTool';
import { Injectable } from '@nestjs/common';
import { CaptchaUserDto } from './dto/captcha-user';
import { CaptchaTool } from 'src/utils/captchaTool';
import { RedisModule } from 'src/utils/modules/redis.module';
import * as dayjs from 'dayjs';
import { TextMessageTool } from 'src/utils/textMessageTool';
import { SecretTool } from 'src/utils/secretTool';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// import { UpdateUserDto } from './dto/update-user.dto';

// Injectable 装饰器将类标记为提供者，并将其注册到应用程序的依赖注入容器中。
@Injectable()
export class UserService {
  constructor(
    private readonly captchaTool: CaptchaTool,
    private readonly textMessageTool: TextMessageTool,
    private readonly redisModule: RedisModule,
    private readonly mathRandomTool: MathRandomTool,
    private readonly secretTool: SecretTool,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // 图形验证码服务
  async getCaptcha(key: string, type: string) {
    const svgCaptcha = await this.captchaTool.captcha();
    this.redisModule.set(`${type}:captcha:${key}`, svgCaptcha.text, 600);
    return { data: svgCaptcha.data, text: svgCaptcha.text };
  }

  async sendCode(
    phone: string,
    captcha: string,
    type: string,
    key: string,
    randomCode: number,
  ) {
    console.log('sendCode2');
    if (await this.redisModule.exists(`${type}:code:${phone}`)) {
      console.log('验证码已存在');
      const result =
        (await this.redisModule.get(`${type}:code:${phone}`)) ?? '';
      const dateRedis = dayjs(Number(result.split('_')[0]));

      if (dayjs(Date.now()).diff(dateRedis, 'minute') < 1) {
        throw new Error('验证码发送过于频繁，请稍后再试');
        return {
          code: 400,
          message: '验证码发送过于频繁，请稍后再试',
        };
      }
    }
    // 是否有获取图形验证码
    if (await this.redisModule.exists(`${type}:captcha:${key}`)) {
      console.log('图形验证码已存在');
      if (
        captcha.toLowerCase() !==
        (await this.redisModule.get(`${type}:captcha:${key}`))!.toLowerCase()
      ) {
        throw new Error('图形验证码错误');
        return {
          code: 400,
          message: '图形验证码错误',
        };
      } else {
        // 发送短信验证码
        this.textMessageTool.sendMsgCode(phone, randomCode);

        // 删除图形验证码
        this.redisModule.del(`${type}:captcha:${key}`);
        // 存储手机短信验证码
        this.redisModule.set(
          `${type}:code:${phone}`,
          `${Date.now()}_${randomCode}`,
          600,
        );
        return {
          code: 200,
          // 没有做发送验证的平台，所以直接返回验证码: randomCode,
          data: randomCode,
          message: '验证码发送成功',
        };
      }
    } else {
      console.log('图形验证码不存在');
      throw new Error('请先获取图形验证码');
    }
  }

  async register(
    phone: string,
    sendCode: string,
    password: string,
    confirm: string,
  ) {
    // 手机号注册查重
    const existUser = await this.userRepository.findOneBy({ phone });
    if (existUser) {
      throw new Error('手机号已注册');
    }
    // 验证码校验
    if (await this.redisModule.exists(`register:code:${phone}`)) {
      const result =
        (await this.redisModule.get(`register:code:${phone}`)) ?? '';
      const dateRedis = dayjs(Number(result.split('_')[0])); // 获取redis中存储的时间
      if (dayjs(Date.now()).diff(dateRedis, 'minute') > 5) {
        throw new Error('验证码已过期');
      }

      if (sendCode !== result.split('_')[1]) {
        throw new Error('验证码错误');
      }
    }
    // 密码校验

    if (password !== confirm) {
      throw new Error('两次密码不一致');
    }
    const username = this.mathRandomTool.randomName();
    const head_img = this.mathRandomTool.randomAvatar();

    const pwd = this.secretTool.getSecret(password);
    // 注册
    const user = await this.userRepository.save({
      phone,
      password: pwd,
      username,
      head_img,
    });

    // 生成token
    const token = this.jwtService.sign({ id: user.id, phone: user.phone });
    return { token, user };
  }

  // 密码登录
  async passwordLogin(phone: string, password: string) {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) {
      throw new Error('用户不存在');
    }
    if (this.secretTool.getSecret(password) !== user.password) {
      throw new Error('密码错误');
    }
    // 生成token
    const token = this.jwtService.sign({ id: user.id, phone: user.phone });
    return { token, user };
  }

  // 手机验证码登录
  async phoneLogin(phone: string, sendCode: string) {
    
    if (await this.redisModule.exists(`login:code:${phone}`)) {
      const result = (await this.redisModule.get(`login:code:${phone}`)) ?? '';
      const dateRedis = dayjs(Number(result.split('_')[0])); // 获取redis中存储的时间
      if (dayjs(Date.now()).diff(dateRedis, 'minute') > 5) {
        throw new Error('验证码已过期');
      }

      if (sendCode !== result.split('_')[1]) {
        throw new Error('验证码错误');
      } else {
        const user = await this.userRepository.findOneBy({ phone });
        if (!user) {
          throw new Error('用户不存在');
        }
        // 生成token
        const token = this.jwtService.sign({ id: user.id, phone: user.phone });
        return { token, user };
      }
    } else {
      throw new Error('请先获取验证码');
    }
  }
}
