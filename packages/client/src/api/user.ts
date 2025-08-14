import request from "../utils/request";
import type { SendCodeRequest, RegisterRequest } from "@lowcode/share";

// 图形验证码接口
export async function getCaptcha(data: { type: string }) {
  return request("/user/captcha", {
    data,
    method: "Post",
  });
}

// 手机验证码接口
export async function sendCode(data: SendCodeRequest) {
  return request("/user/send_code", {
    data,
    method: "Post",
  });
}

// 注册接口
export async function getRegister(data: RegisterRequest) {
  return request("/user/register", {
    data,
    method: "Post",
  });
}
