/**
 * 导入必要的模块和类型
 * @DynamicModule - NestJS提供的动态模块装饰器
 * @Provider - NestJS提供的提供者类型
 */
import type { DynamicModule, Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

/**
 * Redis模块类
 * 使用@Module装饰器标记为NestJS模块
 */
@Module({})
export class RedisModule {
  private redis: Redis; // Redis客户端实例

  /**
   * 构造函数
   * @param options - Redis连接配置选项
   */
  constructor(options: RedisOptions) {
    this.redis = new Redis(options);
  }
  /**
   * 创建并配置Redis模块
   * @param options - Redis连接配置选项
   * @returns 返回配置好的动态模块
   */
  static forRoot(options: RedisOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: RedisModule,
        useValue: new RedisModule(options),
      },
    ];
    return {
      providers,
      global: true,
      exports: providers,
      module: RedisModule,
    };
  }

  set(key: string, value: string, time?: number) {
    time ? this.redis.set(key, value, 'EX', time) : this.redis.set(key, value); //EX:过期时间
  }

  del(key: string) {
    this.redis.del(key);
  }
  async get(key: string) {
    const value = await this.redis.get(key);
    return value ? value.toString() : null;
  }

  async exists(key: string) {
    const value = await this.redis.exists(key);
    return value;
  }
}
