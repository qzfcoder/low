import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';

// 捕获Http异常的过滤器
@Catch(HttpException)
export class AbnormalFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    // 获取响应对象
    const response = ctx.getResponse();
    // 获取异常状态码
    const status = exception.getStatus();
    // 获取请求对象
    const request = ctx.getRequest();

    // 设置响应头
    response.header('Content-Type', 'application/json; charset=utf-8');

    // 设置响应体
    response.status(status).json({
      code: status,
      //    兼容dto的解释
      message: (exception.getResponse() as any).message,
      url: request.originalUrl,
      method: request.method,
    });
  }
}
