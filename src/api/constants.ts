export const uploadMdFileApi =
  import.meta.env.MODE === "development"
    ? "http://localhost:7123/upload/markdown"
    : "https://assets.wxwind.top/upload/markdown";
