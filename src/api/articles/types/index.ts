export type getArticleListResp = {
  title: string;
  articleId: number;
  imageURL: string;
  desc: string;
  publishTime: string;
  updateTime: string;
}[];

export type getArticleFileURLResp = string;

export type addArticleReq = {
  title: string;
  imageURL: string;
  desc: string;
  mdFileName: string;
  publishTime: string;
  updateTime: string;
};
export type addArticleResp = { articleURL: string };
