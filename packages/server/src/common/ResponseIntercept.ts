import type {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import type {Observable} from 'rxjs';
import {map} from 'rxjs'
import { Inject } from '@nestjs/common';


// 拦截器，成功返回 处理响应格式
export class ResponseIntercept implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          data,
          message: 'success',
        };
      }),
    );
  }
}
