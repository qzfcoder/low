import { test } from "@lowcode/share";
import { Button } from "antd";
function App() {
  // const xd = <div>123</div>
  // 返回一个包含test组件的jsx元素
  return (
    <>
      <Button type="primary">Primary Button</Button>
      <div className="text-red-500 bg-blue-100 p-4 font-bold"> {test}</div>
    </>
  );
}

export default App;
