import { useRequest } from "ahooks";
import { Button, Form, Input } from "antd";
import { useStoreAuth } from "../../hooks";
import { getLoginWidthPassword } from "../../api/user.ts";

export default function Account() {
  const { login } = useStoreAuth();
  const { run: passwordLogin, loading: passwordLoading } = useRequest(
    (values) => getLoginWidthPassword(values),
    {
      manual: true,
      onSuccess: ({ data }) => {
        console.log(data);
        login(data.token);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Form onFinish={passwordLogin}>
          <Form.Item
            label="账号"
            name="phone"
            rules={[
              { required: true, message: "请输入手机号!" },
              { pattern: /^1\d{10}$/, message: "请输入正确的手机号!" },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={passwordLoading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
