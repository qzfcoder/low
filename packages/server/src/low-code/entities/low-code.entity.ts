// low-code.entity.ts
import type { IComponent, IComponentData, ILowCode } from '@lowcode/share';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TComponentTypes } from '@lowcode/share';

/**
 * Page实体类
 * 实现ILowCode接口，用于表示页面实体
 * 对应数据库中的page表
 */
@Entity({ name: 'page' })
export class Page implements ILowCode {
  @PrimaryGeneratedColumn()
  id: number = 0; // 页面ID，主键，自增

  @Column()
  account_id: number = 0; // 账户ID，关联创建账户

  @Column()
  page_name: string = ''; // 页面名称

/**
 * 使用TypeORM装饰器定义数据库列
 * 该列的类型为'simple-array'，用于存储数组类型的字符串数据
 * 在数据库中，这通常会转换为以逗号分隔的字符串格式
 * 用于存储页面中的组件列表
 */
  @Column({ type: 'simple-array' }) // 指定列类型为简单数组类型
  components: string[] = []; // 组件列表，存储组件的标识符数组

  @Column()
  tdk: string = ''; // 页面的TDK信息（标题、描述、关键词）

  @Column()
  desc: string = ''; // 页面描述
}

/**
 * Component实体类
 * 实现IComponent接口，用于表示页面组件实体
 * 对应数据库中的component表
 */
@Entity({ name: 'component' })
export class Component implements IComponent {
  @PrimaryGeneratedColumn()
  id: number = 0; // 组件ID，主键，自增

  @Column()
  type: TComponentTypes = 'titleText'; // 组件类型，默认为标题文本组件

  @Column()
  page_id: number = 0; // 所属页面ID，外键关联page表

  @Column()
  account_id: number = 0; // 账户ID，关联创建账户

  @Column({ type: 'simple-json' })
  options: Record<string, any> = {}; // 组件配置选项，使用JSON格式存储
}

/**
 * ComponentData实体类
 * 实现IComponentData接口，用于表示组件数据实体
 * 对应数据库中的component_data表
 */
@Entity({ name: 'component_data' })
export class ComponentData implements IComponentData {
  @PrimaryGeneratedColumn()
  id: number = 0; // 数据ID，主键，自增

  @Column()
  page_id: number = 0; // 所属页面ID，外键关联page表

  @Column()
  user: string = ''; // 数据所属用户标识

  @Column({ type: 'simple-json' })
  props: { // 组件属性数据
    id: number; // 属性ID
    value: string | string[]; // 属性值，可以是字符串或字符串数组
  }[] = []; // 属性数组，存储组件的多个属性
}
