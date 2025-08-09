import { Injectable } from '@nestjs/common';

/**
 *
 * 短信发送
 * */
@Injectable()
export class TextMessageTool {
  async sendMsgCode(phone: string, randomCode: number) {
    // const headers = new Headers();
    // headers.set('Content-Type', 'application/json');
    // 发送
    // const result = await fetch('发送地址', {
    //   // 需要的参数。。。。。。
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify({
    //     phone,
    //     randomCode,
    //   }),
    // });
    // return result.json();
    return {
      code: phone,
      msg: '发送成功',
    };
  }
}
