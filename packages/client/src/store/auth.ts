import { makeAutoObservable } from "mobx"; // 从mobx库中导入makeAutoObservable函数，用于创建可观察对象

/**
 * 创建一个认证相关的store
 * 该store使用mobx进行状态管理，包含token和用户详情信息
 * @returns 返回一个mobx可观察对象实例，包含认证相关的状态
 */
export function createStoreAuth() {
  return makeAutoObservable({ // 使用makeAutoObservable将对象转换为可观察对象
    token: localStorage.getItem("token") || "", // 从localStorage中获取token，如果没有则为空字符串
    details: null, // 用户详情信息，初始为null
  });
}
