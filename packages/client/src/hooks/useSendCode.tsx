import { useRequest } from "ahooks";
import type { FormInstance } from "antd"; // 导入Ant Design的表单实例类型
import { Button, Form, Input } from "antd"; // 导入Ant Design的表单、按钮和输入框组件
import { useEffect, useState } from "react"; // 导入React的副作用钩子和状态钩子
import { getCaptcha, sendCode } from "../api/user";

/**
 * 使用useSendCode函数
 *
 * @param form - 表单实例，用于表单操作
 * @param type - 请求类型，用于区分不同的验证码请求场景
 * @returns 返回使用sendCode函数的对象
 */
export function useSendCode(form: FormInstance, type: string) {
  // 设置倒计时并返回倒计时数值和设置倒计时的方法
  let [countDown, setCountDown] = useState(60);

  // 设置验证码图片源和设置验证码图片源的方法
  const [captchaSrc, setCaptchaSrc] = useState<string>("");

  // 设置是否禁用和设置是否禁用的方法
  const [isDisable, setIsDisable] = useState(false);

  // 设置是否已经开始倒计时和设置是否已经开始倒计时的方法
  const [startedCountDown, setStartedCountDown] = useState(false);
  // 图形验证码请求
  const { run: refreshCaptcha, loading: loadingWithGetCaptcha } = useRequest(
    () => getCaptcha({ type }),
    {
      // manual: true, // 手动触发, 初始不触发
      onSuccess: (res) => {
        console.log(res);
        setCaptchaSrc(res.data.data);
      },
    }
  );
  // 手机验证码请求
  const { run: execSendCode, loading: loadingWithSendCode } = useRequest(
    (values) => sendCode(values),
    {
      // manual: true, // 手动触发, 初始不触发
      onSuccess: () => {
        setStartedCountDown(true);
      },
    }
  );

  /**
   * 验证码倒计时的逻辑
   *
   * - 如果开始倒计时为false，则直接返回
   * - 设置isDisable为true
   * - 每秒执行一次倒计时逻辑
   * - 清除计时器并设置isDisable为false，同时重置countDown和startedCountDown的值
   */
  useEffect(() => {
    if (startedCountDown === false) return;

    setIsDisable(true);
    const timer = setInterval(() => {
      setCountDown(--countDown);
      if (countDown <= 0) {
        clearInterval(timer);
        setIsDisable(false);
        setCountDown(60);
        setStartedCountDown(false);
      }
    }, 1000);
  }, [startedCountDown]);

  /**
   * 获取验证码并进行验证
   */
  async function getCode() {
    // 验证手机号字段
    form.validateFields(["phone"]);
    // 验证验证码字段
    form.validateFields(["captcha"]);
    // 获取手机号字段值并转换为字符串类型
    const phone = form.getFieldsValue().phone as string;
    // 获取验证码字段值并转换为字符串类型
    const captcha = form.getFieldsValue().captcha as string;
    if (!phone || !captcha) return;

    // 验证码接口请求
    execSendCode({ phone, captcha, type });
  }

  /**
   * sendCode模板，包含captcha图片和发送验证码的按钮
   */
  const sendCodeTemplate = (
    <>
      <Form.Item
        label="图形验证码"
        name="captcha"
        rules={[{ required: true, message: "请输入图形验证码!" }]}
      >
        <div className="flex items-center">
          <Input className="w-[122px]" disabled={loadingWithGetCaptcha} />
          <img
            onClick={refreshCaptcha}
            src={`data:image/svg+xml;base64,${btoa(captchaSrc)}`}
            className="w-[102px] h-[32px] inline-block rounded-md"
          />
        </div>
      </Form.Item>

      <Form.Item
        label="手机验证码"
        name="sendCode"
        rules={[{ required: true, message: "请输入手机验证码!" }]}
      >
        <div className="flex items-center">
          <Input className="w-[111px] mr-2" />
          <Button onClick={getCode} disabled={isDisable} className="w-[105px]">
            {loadingWithSendCode
              ? "加载中"
              : isDisable
                ? `${countDown}秒后重发`
                : "获取验证码"}
          </Button>
        </div>
      </Form.Item>
    </>
  );

  return {
    sendCodeTemplate,
    refreshCaptcha,
  };
}
