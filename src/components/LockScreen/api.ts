import { request } from "@/utils/request";

const { VITE_HOST } = import.meta.env;

// #region 操作密码校验接口
export interface ICheckPwdResult {
  /**
   * 0:成功，其他：失败
   */
  code: string;
  message: string;
}

export interface ICheckPwdData {
  /**
   * 类型：LOCK_SCREEN:锁屏
   */
  type: string;
  /**
   * 密码
   */
  password: string;
}

/**
 * 操作密码校验接口
 * /project/2205/interface/api/378926
 * @author
 *
 * @param {ICheckPwdData} data
 * @returns
 */
export function checkPwd(data: ICheckPwdData) {
  return request<ICheckPwdResult>({
    url: `${VITE_HOST}/user/operation/pwd/check`,
    method: "POST",
    data,
  });
}
// #endregion
