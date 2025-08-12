import { JwtModuleOptions } from '@nestjs/jwt';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisOptions } from 'ioredis';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '121.199.58.44',
  port: 3306,
  username: 'root',
  password: 'qzf123456',
  database: 'lowcode',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
};

export const redisConfig: RedisOptions = {
  host: '121.199.58.44',
  port: 6379,
  password: 'qzf123456',
  // db: 0,
};

export const jwtConfig: JwtModuleOptions = {
  secret: 'lowcode',
  global: true,
  signOptions: { expiresIn: '1d' }, // 过期时间
};
