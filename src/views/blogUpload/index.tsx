import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, DatePicker } from "antd";
import { uploadMdFileApi } from "@/api/constants";
import { addArticle } from "@/api/articles";
import dayjs from "dayjs";
import { ValidateStatus } from "antd/es/form/FormItem";

function BlogUpload() {
  const [form] = Form.useForm();
  const [fileHelpText, setfileHelpText] = useState("");
  const [fileValidateStatus, setfileValidateStatus] = useState<ValidateStatus>("error");

  const submitForm = async (values: any) => {
    console.log("finish:", values);
    if (values.file === undefined) {
      setfileValidateStatus("error");
      setfileHelpText("请上传博客");
      return;
    } else {
      switch (values.file[0].status) {
        case "done":
          break;
        case "uploading":
          setfileValidateStatus("error");
          setfileHelpText("请等待博客上传完毕");
          return;
        case "error":
          setfileValidateStatus("error");
          setfileHelpText("博客上传出错");
          return;
        case "success":
          setfileValidateStatus("warning");
          setfileHelpText("博客上传状态为success");
          return;
      }
    }

    const form = {
      title: values.desc,
      imageURL: values.imageURL,
      mdFileName: values.file[0].name,
      desc: values.desc,
      publishTime: values.publishTime.format("YYYY-MM-DD"),
      updateTime: values.updateTime.format("YYYY-MM-DD"),
    };
    console.log("finish form:", form);
    const articleURL = await addArticle(form);
    const w = window.open("about:blank");
    w && (w.location.href = articleURL.data.articleURL);
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form}
        onFinish={submitForm}
      >
        <Form.Item
          label="上传md文件"
          name="file"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
          valuePropName="fileList"
          validateStatus={fileValidateStatus}
          help={fileHelpText}
        >
          <Upload
            action={uploadMdFileApi}
            maxCount={1}
            accept=".md"
            onChange={(info) => {
              if (info.file.status === "error") {
                setfileHelpText("上传出错，请重新上传");
                setfileValidateStatus("error");
              } else if (info.file.status === "done") {
                setfileHelpText("上传成功");
                setfileValidateStatus("success");
                form?.setFieldValue("publishTime", dayjs());
                form?.setFieldValue("updateTime", dayjs());
                form?.setFieldValue("title", info.file.name.split(".")[0]);
                form?.setFieldValue("desc", info.file.name.split(".")[0]);
              }
            }}
            beforeUpload={(file) => {
              setfileHelpText("");
              const fileName = file.name;
              const a = fileName.lastIndexOf(".");
              const ext = fileName.substring(a + 1);
              const IsMd = ext === "md";
              if (!IsMd) {
                message.error(`'${file.name}' is not a .md file`);
              }
              return IsMd || Upload.LIST_IGNORE;
            }}
          >
            <Button icon={<UploadOutlined />}>上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="详细描述" name="desc" rules={[{ required: true, message: "请输入详细描述" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="缩略图" name="imageURL" rules={[{ required: true, message: "请输入图片地址" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="发布时间" name="publishTime" rules={[{ required: true, message: "请输入发布时间" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="更新时间" name="updateTime" rules={[{ required: true, message: "请输入更新时间" }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default BlogUpload;
