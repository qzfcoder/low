import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host:'121.199.58.44',
  port: 3306,
  username: 'root',
  password: 'qzf123456',
  database: 'lowcode',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  autoLoadEntities: true,
}