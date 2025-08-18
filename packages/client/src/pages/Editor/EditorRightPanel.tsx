import { Tabs } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";

export default function EditorRightPanel() {
  const items = [
    {
      key: "components-fields",
      label: (
        <>
          <AppstoreOutlined />
          <span>组件属性</span>
        </>
      ),
      // 组件属性
    },
    {
      key: "page-fields",
      label: (
        <>
          <SettingOutlined />
          <span>全局属性</span>
        </>
      ),
      // 全局组件属性
    },
  ];

  return <Tabs defaultActiveKey="components-fields" items={items} />;
}
