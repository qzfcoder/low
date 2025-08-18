import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, Logger } from '@nestjs/common';

// 捕获所有异常的过滤器
@Catch(Error, HttpException)
export class AbnormalFilter implements ExceptionFilter {
  private readonly logger = new Logger(AbnormalFilter.name);

  catch(exception: Error | HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    // 获取响应对象
    const response = ctx.getResponse();
    // 获取请求对象
    const request = ctx.getRequest();

    // 设置响应头
    response.header('Content-Type', 'application/json; charset=utf-8');

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      // 处理 HTTP 异常
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // 处理不同类型的响应格式
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        // 如果message是数组，取第一个元素；如果是字符串，直接使用
        const rawMessage = (exceptionResponse as any).message;
        message = Array.isArray(rawMessage) ? rawMessage[0] : rawMessage;
      } else {
        message = exception.message;
      }
    } else {
      // 处理普通错误
      status = 500;
      message = exception.message;

      // 记录非 HTTP 异常的日志
      this.logger.error(`${request.method} ${request.url}`, exception.stack);
    }

    // 设置响应体
    response.status(status).json({
      code: status,
      message: message, // 直接返回字符串格式的错误信息
      url: request.originalUrl,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
