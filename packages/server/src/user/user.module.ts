import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SecretTool } from 'src/utils/secretTool';
import { CaptchaTool } from 'src/utils/captchaTool';
import { TextMessageTool } from 'src/utils/textMessageTool';
import { MathRandomTool } from 'src/utils/mathRandomTool';
/**
 * 用户模块装饰器
 * 使用 @Module 装饰器来定义用户模块的元数据
 */
@Module({
  // 引入实体类，以便在模块中使用
  // 使用 TypeORM 模块的 forFeature 方法来注册 User 实体
  imports: [TypeOrmModule.forFeature([User])],
  // 导出控制器，以便在其他模块中使用
  // 将用户控制器注册到模块中，处理 HTTP 请求
  controllers: [UserController],
  // 提供服务和其他提供者
  // 注册用户服务、密钥工具和验证码工具等提供者
  providers: [
    UserService,
    SecretTool,
    CaptchaTool,
    TextMessageTool,
    MathRandomTool,
  ],
})
export class UserModule {}
