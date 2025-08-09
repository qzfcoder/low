import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseIntercept } from './common/ResponseIntercept';
import { AbnormalFilter } from './common/AbnormalFilter';
import { ValidationPipe } from '@nestjs/common';

// 创建一个异步函数，用于启动应用程序
async function bootstrap() {
  // 创建一个Nest应用程序实例
  const app = await NestFactory.create(AppModule);
  // 使用全局过滤器
  app.useGlobalFilters(new AbnormalFilter());
  // 使用全局拦截器
  app.useGlobalInterceptors(new ResponseIntercept());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  // 监听指定的端口，如果没有指定，则监听3000端口
  await app.listen(process.env.PORT ?? 3000);
}
// 调用启动函数
bootstrap();
