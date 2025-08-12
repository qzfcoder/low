/**
 * 这是一个自定义参数装饰器
 */

import type { ExecutionContext } from '@nestjs/common'; // 执行上下文的类型

import { createParamDecorator } from '@nestjs/common'; // 用于创建自定义参数装饰器

// 获取用户IP的参数+
const GetUserIP = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // 获取当前Http请求对象
    const request = ctx.switchToHttp().getRequest();
    // console.log('request', request);
    // 获取到用户的ip地址，使用正则匹配出ip地址ipv4转成字符串形式
    return request.ip.match(/\d+\.\d+\.\d+\.\d+/)?.join('.');
  },
);
// 获取用户的设备的参数装饰器
const GetUserDevice = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // 获取当前Http请求对象
    const request = ctx.switchToHttp().getRequest();
    //获取到用户设备类型
    return request.headers['user-agent'];
  },
);

export { GetUserIP, GetUserDevice };
