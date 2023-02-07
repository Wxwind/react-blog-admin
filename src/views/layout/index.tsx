import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Layout as AntdLayout, Menu, theme } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import BreadCrumb from "./components/breadCrumb";
const { Header, Content, Footer, Sider } = AntdLayout;

const menuItems: ItemType[] = [
  {
    key: "sub1",
    icon: <FolderOpenOutlined />,
    label: <Link to="/blogList">博客列表</Link>,
  },
  {
    key: "sub2",
    icon: <UploadOutlined />,
    label: <Link to="/blogUpdate">上传博客</Link>,
  },
];

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
      </Sider>
      <AntdLayout>
        <Header
          style={{
            padding: "5px 10px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: "20px", paddingLeft: "10px" },
          })}

          <BreadCrumb />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 100,
            height: "10%",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
