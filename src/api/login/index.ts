import { postData } from "../request";
import { loginReq, loginResp } from "./types";

export const login = (username: string, password: string) => {
  return postData<loginReq, loginResp>("/login", { username, password });
};
