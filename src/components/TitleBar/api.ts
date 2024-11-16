import { request } from "@/utils/request";

const { VITE_HOST } = import.meta.env;

// #region 根据用户TOKEN登出
export interface ILogoutResult {
  /**
   * 结果码，0成功，其他失败
   */
  code: number;
  /**
   * 提示消息，失败时返回
   */
  message: string;
  /**
   * 返回结果
   */
  result: boolean;
}

export interface ILogoutData {
  /**
   * 用户TOKEN
   */
  accessToken: string;
}

/**
 * 根据用户TOKEN登出
 * @author
 *
 * @param {ILogoutData} data
 * @returns
 */
export function logout(data: ILogoutData) {
  return request<ILogoutResult>({
    url: `${VITE_HOST}/account/logout`,
    method: "POST",
    data,
  });
}

//#endregion
