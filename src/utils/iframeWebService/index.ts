import { request } from "./request";

export function refresh() {
  return request({
    cmd: "refresh",
  });
}

export function logOut() {
  return request({
    cmd: "logOut",
  });
}
