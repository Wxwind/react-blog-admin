import { Breadcrumb } from "antd";
import React from "react";
import { useLocation, Link } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
  "/blogList": "博客列表",
  "/blogUpdate": "上传博客",
};

function BreadCrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = paths.map((_, index) => {
    const url = `/${paths.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb style={{ display: "inline-block", paddingLeft: "10px" }}>{breadcrumbItems}</Breadcrumb>;
}

export default BreadCrumb;
