import { getArticleList } from "@/api/articles";
import { Card, Table, Space, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataType {
  title: string;
  articleId: number;
  publishTime: string;
  updateTime: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    key: "articleId",
    dataIndex: "articleId",
  },
  {
    title: "标题",
    key: "title",
    dataIndex: "title",
  },
  {
    title: "发布时间",
    key: "publishTime",
    dataIndex: "publishTime",
  },
  {
    title: "更新时间",
    key: "updateTime",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => {
            const w = window.open("about:blank");
            w && (w.location.href = `https://www.wxwind.top/article/${record.articleId}`);
          }}
        >
          <SearchOutlined />
          查看
        </Button>
        <Button type="primary">
          <EditOutlined />
          修改
        </Button>
      </Space>
    ),
  },
];

function BlogList() {
  const [dataSource, setdataSource] = useState<DataType[]>([]);

  useEffect(() => {
    const getDataSource = async () => {
      const res = await getArticleList();
      setdataSource(res.data);
    };
    getDataSource();
  }, []);

  return (
    <Card style={{ boxShadow: " 0 3px 8px 6px rgba(7, 17, 27, 0.06)" }}>
      <Table dataSource={dataSource} columns={columns} rowKey={(record) => record.articleId}></Table>
    </Card>
  );
}

export default BlogList;
