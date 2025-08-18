import { Button, Checkbox, Form, Input, message } from "antd";
import { useSendCode, useStoreAuth } from "../../hooks";
import { useRequest } from "ahooks";
import { getRegister } from "../../api/user";
import type { RegisterRequest } from "@lowcode/share";

export default function RegisterCaptcha() {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const { refreshCaptcha, sendCodeTemplate } = useSendCode(form, "register");

  const { login } = useStoreAuth();

  // 注册接口请求
  const { run: execRegister, loading: loadingWithRegister } = useRequest(
    async (values: RegisterRequest) => await getRegister(values),
    {
      manual: true,
      onSuccess: ({ data }) => {
        login(data.token);
      },
      onError: (error) => {
        // message.error(error.message);
        messageApi.open({
          type: "error",
          content: error.message,
        });
        console.log(error);
      },
      onFinally: () => {
        refreshCaptcha();
      },
    }
  );

  return (
    <>
      {contextHolder}
      <div className="space-y-4">
        <div className="space-y-2">
          <Form
            form={form}
            onFinish={(values) => {
              execRegister(values);
            }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="手机号码"
              name="phone"
              rules={[{ required: true, message: "请输入手机号码!" }]}
            >
              <Input />
            </Form.Item>

            {sendCodeTemplate}

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirm"
              rules={[{ required: true, message: "请输入确认密码!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("请同意协议!")),
                },
              ]}
            >
              <Checkbox>同意《隐私策略》</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                disabled={loadingWithRegister}
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
