import { Injectable } from '@nestjs/common';

import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaTool {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      background: '##bbb', // 背景颜色
      height: 60, // 验证码高度
      fontSize: 75, // 验证码文字大小
    });
    return captcha;
  }
}
