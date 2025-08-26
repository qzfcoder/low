/**
 * 导入类型定义
 * @type {TComponentPropsUnion} 组件属性联合类型
 */
import type { TComponentPropsUnion } from "@lowcode/share";
/**
 * 导入 MobX 的 makeAutoObservable 函数
 * 用于创建可观察的对象
 */
import { makeAutoObservable } from "mobx";

/**
 * 组件状态管理接口定义
 * @interface IStoreComponents
 */
interface IStoreComponents {
  compConfigs: Record<string, TComponentPropsUnion>; // 所有组件属性信息
  sortableCompConfig: string[]; // 所有组件的排序
  currentCompConfig: string | null; // 当前选中的组件
  copyedCompConig: TComponentPropsUnion | null; // 复制组件
  itemsExpandIndex: number; // 组件属性选项展开折叠，0：折叠，1：展开
}

/**
 * 创建组件状态管理实例
 * @returns {IStoreComponents} 返回一个可观察的组件状态管理实例
 */
export function createStoreComponents() {
  // 使用 makeAutoObservable 函数创建一个可观察的响应式对象
  // IStoreComponents 是泛型参数，指定了对象的类型结构
  return makeAutoObservable<IStoreComponents>({
    compConfigs: {},
    sortableCompConfig: [],
    currentCompConfig: null,
    copyedCompConig: null,
    itemsExpandIndex: 0,
  });
}

/**
 * 组件状态管理类型定义
 * @type {TStoreComponents} createStoreComponents 函数返回值的类型
 */
export type TStoreComponents = ReturnType<typeof createStoreComponents>;
