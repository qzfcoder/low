import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  // 引入实体类，以便在模块中使用
  imports: [TypeOrmModule.forFeature([User])],
  // 导出控制器，以便在其他模块中使用
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
