import { useRequest } from "ahooks";
import { Button, Form, Input, message } from "antd";
import { useSendCode, useStoreAuth } from "../../hooks";
import { getLoginWithSendCode } from "../../api/user.ts";
export default function Captcha() {
  const [form] = Form.useForm();
  const { sendCodeTemplate } = useSendCode(form, "login");

  const [messageApi, contextHolder] = message.useMessage();

  const { login } = useStoreAuth();

  const { run: phoneLogin, loading: phoneLoading } = useRequest(
    (values) => getLoginWithSendCode(values),
    {
      manual: true,
      onSuccess: ({ data }) => {
        console.log(data)
        if (data) {
          login(data.token);
        }
      },
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      },
    }
  );

  return (
    <>
      {contextHolder}
      <div className="space-y-4">
        <div className="space-y-2">
          <Form onFinish={phoneLogin} form={form}>
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

            {sendCodeTemplate}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={phoneLoading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
