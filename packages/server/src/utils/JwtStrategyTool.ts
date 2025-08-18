import { Injectable, UnauthorizedException } from '@nestjs/common'; // 导入NestJS的核心模块和异常类
import { PassportStrategy } from '@nestjs/passport'; // 导入Passport策略装饰器
import type { StrategyOptions } from 'passport-jwt'; // 导入JWT策略的类型定义
import { ExtractJwt, Strategy } from 'passport-jwt'; // 导入JWT提取和策略类
import { Repository } from 'typeorm'; // 导入TypeORM仓储类
import { InjectRepository } from '@nestjs/typeorm'; // 导入仓储注入装饰器
import { jwtConfig } from 'config'; // 导入JWT配置
import { User } from '../user/entities/user.entity'; // 导入用户实体

/**
 * JWT策略工具类
 * 继承自PassportStrategy，实现JWT认证策略
 * 用于处理基于JWT的认证流程
 */
@Injectable() // 标记为可注入的服务
export class JwtStrategyTool extends PassportStrategy(Strategy, 'jwt') {
  // 定义JWT策略类，继承自Passport的Strategy
  /**
   * 构造函数，注入用户仓储
   * @param userRepository 用户仓储，用于数据库操作
   * 通过依赖注入获取用户仓储实例
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // 使用TypeORM装饰器注入用户仓储
  ) {
    super({
      // 调用父类构造函数，配置JWT策略
      secretOrKey: jwtConfig.secret, // 设置JWT密钥
      // 从请求头中提取JWT令牌
      // 使用ExtractJwt.fromAuthHeaderAsBearerToken()方法
      // 从Authorization头中提取Bearer类型的令牌
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 配置JWT提取方式
    } as StrategyOptions); // 使用类型断言确保符合StrategyOptions接口
  }
  /**
   * 验证令牌是否有效
   * @param data - 包含用户ID、签发时间和过期时间的对象
   * @returns 当令牌有效时，返回当前用户的属性集合（除密码之外）
   * @throws 当令牌无效时，抛出异常
   */
  async validate(data: { id: number; iat: number; exp: number }) {
    if (!data) throw new UnauthorizedException('请先登录');

    if (data.exp - data.iat <= 0)
      throw new UnauthorizedException('登录已过期，请重新登陆');

    const user = await this.userRepository.findOne({ where: { id: data.id } });
    if (!user) throw new UnauthorizedException('出现错误，请重新登录');

    return { ...user, password: '' };
  }
}
