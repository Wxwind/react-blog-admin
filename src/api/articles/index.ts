import { getData, postData } from "../request";
import { getArticleListResp, getArticleFileURLResp, addArticleResp, addArticleReq } from "@/api/types";
export const getArticleList = () => {
  return getData<getArticleListResp>("/articles");
};

export const getArticleFileURL = (articleId: number) => {
  return getData<getArticleFileURLResp>(`/articles/${articleId}`);
};

export const addArticle = (values: addArticleReq) => {
  return postData<addArticleReq, addArticleResp>(`/articles`, values);
};
