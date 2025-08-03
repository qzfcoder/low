import { Injectable } from '@nestjs/common';
import { FindUserDto } from './dto/find-user';
// import { UpdateUserDto } from './dto/update-user.dto';



// Injectable 装饰器将类标记为提供者，并将其注册到应用程序的依赖注入容器中。
@Injectable()
export class UserService {
  findAll({id}:FindUserDto) {
    return id;
  }
}
