import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostReleaseRequest } from '@lowcode/share';
import { getUserMess, TCurrentUser } from 'src/utils/getUserMessTool';
import { DataSource } from 'typeorm';
import { Page, Component, ComponentData } from './entities/low-code.entity';
import { update } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 低代码服务类
 * 提供低代码页面的发布、更新等功能
 */
@Injectable()
export class LowCodeService {
  /**
   * 构造函数
   * @param dataSource 数据库连接源
   */
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
  ) {}
  async release(body: PostReleaseRequest, userMess: TCurrentUser) {
    const { components, ...otehrBody } = body;
    // 创建事务
    const queryRunner = this.dataSource.createQueryRunner();
    let id;

    async function insertComponents(page_id: number) {
      const insertComponents: string[] = [];
      for (const component of components) {
        const componentResult = await queryRunner.manager.insert(Component, {
          ...component,
          page_id,
          account_id: userMess.id,
        });
        insertComponents.push(componentResult.identifiers[0].id);
      }
      // 更新页面表的components
      await queryRunner.manager.update(
        Page,
        { id: page_id },
        { components: insertComponents },
      );
    }
    // 更新的方法
    async function updateLowCodePage(findLowCode: Page, id: number) {
      await queryRunner.manager.update(
        Page,
        { id: id },
        {
          ...otehrBody,
          components: [],
        },
      );
      // 删除旧的 components 表数据
      for (const component of findLowCode.components) {
        await queryRunner.manager.delete(Component, component);
      }
      // 删除componentsdata数据
      const componentDatas = await queryRunner.manager.findBy(ComponentData, {
        page_id: id,
      });

      for (const componentData of componentDatas) {
        await queryRunner.manager.delete(ComponentData, componentData);
      }
      await insertComponents(id);
    }
    // 创建
    async function createLowCodePage() {
      const lowCode = await queryRunner.manager.insert(Page, {
        ...otehrBody,
        components: [],
        account_id: userMess.id,
      });
      const pageId = lowCode.identifiers[0].id;
      console.log(pageId, pageId);
      id = pageId;
      await insertComponents(pageId);
    }
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      // 执行事务

      // 查找当前页面是否存在
      const findLowCode = await queryRunner.manager.findBy(Page, {
        account_id: userMess.id,
      });
      console.log('findLowCode', findLowCode);
      if (findLowCode.length) {
        // 存在更新
        id = findLowCode[0].id;
        await updateLowCodePage(findLowCode[0], id);
      } else {
        // 不存在创建
        await createLowCodePage();
        // await queryRunner.manager.insert(Page, {
        //   ...otehrBody,
        //   components: JSON.stringify(components),
        //   account_id: userMess.id,
        // });
      }
      await queryRunner.commitTransaction();
      console.log('事务已提交');
    } catch (e) {
      console.log('事务失败', e);
      queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`发布失败${e}`);
    } finally {
      // 释放事务
      await queryRunner.release();
    }

    return {
      code: 200,
      message: '发布成功',
      data: { id },
    };
  }

  async getReleaseData(userMess: TCurrentUser) {
    // 查找用户是否发布过页面
    const lowCode = await this.pageRepository.findOneBy({
      account_id: userMess.id,
    });

    if (!lowCode) {
      return;
    }
    const components: Component[] = [];
    const componentIds = lowCode.components; // 获取到该页面组件的 ids
    for (const componentId of componentIds) {
      const component = await this.componentRepository.findOneBy({
        id: Number(componentId),
      });
      components.push(component as Component);
    }
    return {
      components,
      componentIds,
    };
  }
}
