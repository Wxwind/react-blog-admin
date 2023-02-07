export * from "@/api/articles/types";
export * from "@/api/login/types";
export type MyResponseType<T> = {
  meta: {
    status: number;
    msg: string;
  };
  data: T;
};
