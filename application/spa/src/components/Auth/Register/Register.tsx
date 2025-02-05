import { Button, Card, Form, Input, Layout } from "antd";
import { useCallback } from "react";
import { apiClientClass, User } from "../../../shared/api";
import { ApiConfig } from "../../../shared/api/http-client";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import "./Register.scss";

const MESSAGE = 'Пожалуйста, заполните обязательное поле';

interface Register {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  telegram: string;
  organization: string;
  team: string;
}

export const Register = () => {
  const configMcc: ApiConfig = {
    baseUrl: "http://localhost:8000",
  };

  const apiClient = new apiClientClass(configMcc);

  const navigate = useNavigate();

  const userCreate = useCallback((data: User) => {
    data.phone = data.phone && data.phone.slice(0, -1);
    apiClient.Users.usersCreate({ ...data, is_superuser: false }).then(() => navigate("/login"));
  }, []);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }} className="layout">
      <Card className="register-card">
        <Form 
          onFinish={userCreate} 
          layout="vertical" 
          initialValues={{
            telegram: "", 
            organization: "", 
            team: "", 
          }} 
        >
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[
              {
                max: 150, 
                required: true, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                max: 128, 
                required: true, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item 
            name="first_name" 
            label="Имя" 
            rules={[
              {
                max: 150, 
                required: true, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Фамилия"
            rules={[
              {
                max: 150, 
                required: true, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Адрес электронной почты"
            rules={[
              {
                max: 254, 
                required: true, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[
              {
                len: 19, 
                required: true, 
                message: MESSAGE, 
              }, 
            ]}
          >
            {/* @ts-expect-error Server Component */}
            <InputMask mask="+7 (999) 999 99-99" maskChar="_">
              {(inputProps: any) => <Input {...inputProps} />}
            </InputMask>
          </Form.Item>
          <Form.Item
            name="telegram"
            label="Telegram"
            rules={[
              {
                max: 50, 
                required: false, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input
              type="text" 
              addonBefore={<span style={{ color: 'gray' }}>@</span>} 
              onChange={(e) => {
                e.target.value = e.target.value.replace(/^@/, '');
              }} 
            />
          </Form.Item>
          <Form.Item
            name="organization"
            label="Название организации"
            rules={[
              {
                max: 150, 
                required: false, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="team"
            label="Название команды"
            rules={[
              {
                max: 50, 
                required: false, 
                message: MESSAGE, 
              }, 
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Зарегестрироваться
            </Button>
            <Button type="default" onClick={() => navigate(-1)} style={{ width: "100%", marginTop: 10 }}>
              Назад
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};
