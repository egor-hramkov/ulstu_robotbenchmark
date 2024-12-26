import React from "react";
import { Layout, Menu, theme, Button, Typography, Card } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"; // Импортируем иконки
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { menuPoints } from "./ui/header/nav";
import Sider from "antd/es/layout/Sider";

const { Content } = Layout;
const { Text } = Typography; // Деструктурируем Text из Typography

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Логика выхода
    console.log("Выход из системы");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsible style={{ overflow: "hidden" }}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          items={menuPoints}
          mode="inline"
          onClick={(info) => navigate(info.key)}
          style={{ flex: 1, minWidth: 0 }}
        />
        {/* Блок пользователя */}
        <Card
          className="p-4 bg-slate-300 flex flex-col items-center justify-center absolute bottom-0 w-full"
          style={{ margin: '20px 0' }} // Отступы для карточки
        >
          <UserOutlined
            style={{ fontSize: "40px", marginBottom: "8px", color: "#1890ff" }}
          />
          <Text strong className="mb-2">
            Имя пользователя
          </Text>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ color: "#1890ff" }}
          >
            Выход
          </Button>
        </Card>
      </Sider>
      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: 24, height: "100%", overflow: "auto" }}>
          {/* Прокрутка только для содержимого */}
          <div
            style={{
              background: colorBgContainer,
              padding: 24,
              borderRadius: borderRadiusLG,
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;