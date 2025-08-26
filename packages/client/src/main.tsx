/**
 * 主应用入口文件
 * 该文件负责将React应用渲染到DOM中，并配置路由和严格模式
 */
import { StrictMode } from "react"; // 从React库中导入严格模式组件，用于开发阶段检测潜在问题
import { createRoot } from "react-dom/client"; // 从React DOM库中创建根节点，用于React 18的并发渲染
import "./assets/base.css"; // 导入基础样式文件，定义应用的全局样式
import { router } from "./router"; // 导入路由配置，定义应用的路由规则
import { RouterProvider } from "react-router-dom"; // 从React Router中导入路由提供者组件

// 创建根节点并将React应用渲染到DOM中
// 使用严格模式包裹应用，以检测潜在问题并优化开发体验
// RouterProvider组件用于提供路由功能，使应用能够根据URL渲染对应组件
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
