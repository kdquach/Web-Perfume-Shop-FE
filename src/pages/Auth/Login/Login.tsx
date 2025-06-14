import { Form, Input } from "antd";
import type React from "react";

type FieldType = {
  email: string,
  password: string
}

const Login: React.FC<FieldType> = () => {
  return (
    <>
      <Form>
        <Form.Item>
          <Input></Input>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login;