import type { IUser } from "..";

export interface CaptchaRequest {
  type: "register" | "login";
}

// 注册接口的参数类型
export type RegisterRequest = Pick<IUser, "phone" | "password"> & {
  sendCode: string;
  confirm: string;
};

// 短信验证码接口的参数类型
export type SendCodeRequest = Pick<IUser, "phone"> & {
  captcha: string;
} & CaptchaRequest;
