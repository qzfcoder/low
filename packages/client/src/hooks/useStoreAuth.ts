/**
 * 导入computed函数从mobx库，用于创建计算属性
 * 导入createStoreAuth函数从store模块，用于创建认证相关的store实例
 */
import { computed } from "mobx";
import { createStoreAuth } from "../store";

// 创建认证store的实例
export const storeAuth = createStoreAuth();

/**
 * 自定义Hook，用于获取认证相关的状态
 * 返回一个包含登录状态计算属性的对象
 * @returns {Object} 包含isLogin计算属性的对象
 */
export const useStoreAuth = () => {
  // 使用computed创建计算属性，根据token是否存在判断是否登录
  const isLogin = computed(() => !!storeAuth.token);
  return { isLogin };
};
