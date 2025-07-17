import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import type React from "react";
import { login } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";


type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC<FieldType> = () => {
  const navigate = useNavigate();
  const handleLogin = async (values: FieldType) => {
    try {
      console.log(values.email);
      const data = await login(values.email, values.password);
      localStorage.setItem("user", JSON.stringify(data));
      // Xử lý lưu token hoặc chuyển trang tại đây
      navigate("/admin/products-management");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error);
      // Hiển thị thông báo lỗi nếu cần
    }
  };

  return (
    <>
      <div className="container">
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          layout="vertical"
          requiredMark="optional"
        >
          <Typography.Title level={1}>Login</Typography.Title>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
