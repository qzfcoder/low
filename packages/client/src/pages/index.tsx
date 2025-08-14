/**
 * Home组件
 * 这是一个React函数组件，用于展示首页内容
 * 使用了React Router的useLocation钩子来获取当前路径信息
 */
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStoreAuth } from "../hooks/index";

function Home() {
  const { isLogin } = useStoreAuth();

  // 使用useLocation钩子获取当前location对象
  const location = useLocation();

  const nav = useNavigate(); // 使用useNavigate钩子获取导航函数
  function beforeRouterChange(pathname: string) {
    console.log("beforeRouterChange", pathname);

    // 已经登录了
    if (isLogin.get()) {
      ["/", "/loginOrRegister"].includes(pathname) && nav("/edit");
    } else {
      // 未登录
      pathname !== "/loginOrRegister" && nav("/loginOrRegister");
    }
  }

  // 使用useEffect钩子监听路径变化
  // 当location.pathname发生变化时，useEffect会执行
  useEffect(() => {
    beforeRouterChange(location.pathname);
  }, [location.pathname]);

  // 返回首页的JSX元素
  return <Outlet />;
}

// 导出Home组件，使其可以在其他组件中被导入使用
export default Home;
