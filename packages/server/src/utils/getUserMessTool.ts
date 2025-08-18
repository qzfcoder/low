/**
 * 这是一个自定义参数装饰器
 */

import { IUser } from '@lowcode/share';
import type { ExecutionContext } from '@nestjs/common'; // 执行上下文的类型

import { createParamDecorator } from '@nestjs/common'; // 用于创建自定义参数装饰器

// 用户数据类型删除 password
export type TCurrentUser = Omit<IUser, 'password'>;

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
// 获取用户所有信息参数装饰器
const getUserMess = createParamDecorator((data, ctx: ExecutionContext) => {
  // 获取当前 HTTP 的请求对象
  const request = ctx.switchToHttp().getRequest();

  // 获取用户的所以信息
  return request.user;
});
export { GetUserIP, GetUserDevice, getUserMess };
