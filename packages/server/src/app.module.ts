import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig, redisConfig, jwtConfig } from '../config';
import { UserModule } from './user/user.module';
import { RedisModule } from './utils/modules/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { LowCodeModule } from './low-code/low-code.module';
import { JwtStrategyTool } from './utils/JwtStrategyTool';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    RedisModule.forRoot(redisConfig),
    JwtModule.register(jwtConfig),
    { ...TypeOrmModule.forFeature([User]), global: true }, // 全局注册实体
    LowCodeModule,
  ],
  controllers: [],
  providers: [
    JwtStrategyTool, // jwt策略工具
  ],
})
export class AppModule {}
