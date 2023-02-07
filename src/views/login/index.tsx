import { login } from "@/api/login";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import styles from "./styles.module.scss";

const Login = () => {
  const onFinish = async (values: any) => {
    console.log(values);
    const res = await login(values.username, values.password);
    console.log(res.data.token);
  };

  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <Form
          name="loginForm"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, width: "30%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className={styles.title}>
            <h3>管理登录</h3>
          </div>
          <FormItem name="username" initialValue="wxwind" rules={[{ required: true, message: "用户名不能为空" }]}>
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: "密码不能为空" }]}>
            <Input.Password placeholder="请输入密码" />
          </FormItem>
          <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: "10px" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
