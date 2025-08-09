import { Injectable } from '@nestjs/common';
import { CaptchaUserDto } from './dto/captcha-user';
import { CaptchaTool } from 'src/utils/captchaTool';
import { RedisModule } from 'src/utils/modules/redis.module';

// import { UpdateUserDto } from './dto/update-user.dto';

// Injectable 装饰器将类标记为提供者，并将其注册到应用程序的依赖注入容器中。
@Injectable()
export class UserService {
  constructor(
    private readonly captchaTool: CaptchaTool,
    private readonly redisModule: RedisModule,
  ) {}
  // 图形验证码服务
  async getCaptcha(key: string, type: string) {
    const svgCaptcha = await this.captchaTool.captcha();
    this.redisModule.set(`${type}:captcha:${key}`, svgCaptcha.text, 600);
    return { data: svgCaptcha.data, text: svgCaptcha.text };
  }
}
