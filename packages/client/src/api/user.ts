import request from "../utils/request";
import type {
  SendCodeRequest,
  RegisterRequest,
  LoginWithPasswordRequest,
  LoginWithSendCodeRequest,
} from "@lowcode/share";

// 图形验证码接口
export async function getCaptcha(data: { type: string }) {
  return request("/user/captcha", {
    data,
    method: "Post",
  });
}

// 手机验证码接口
export async function sendCode(data: SendCodeRequest) {
  return request("/user/sendCode", {
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

// 登录接口
export async function getLoginWidthPassword(data: LoginWithPasswordRequest) {
  return request("/user/passwordLogin", {
    data,
    method: "Post",
  });
}

// 手机验证码登录接口
export async function getLoginWithSendCode(data: LoginWithSendCodeRequest) {
  return request("/user/phoneLogin", {
    data,
    method: "Post",
  });
}
