import React from "react";
import { Layout, Menu, theme, Button, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"; // Импортируем иконки
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { menuPoints } from "./ui/header/nav";
import Sider from "antd/es/layout/Sider";
import { useAuthStore } from "./store/useAuthStore";

const { Content } = Layout;
const { Text } = Typography; // Деструктурируем Text из Typography

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { logout, userInfo } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{ overflow: "hidden", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          items={menuPoints}
          mode="inline"
          onClick={(info) => navigate(info.key)}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div
          className="p-4 bg-slate-300 flex flex-col items-center justify-center absolute bottom-0 w-full"
          style={{
            margin: "15px",
            padding: 15,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 8
          }} // Отступы для карточки
        >
          <UserOutlined
            style={{ fontSize: "40px", marginBottom: "8px", color: "#1890ff" }}
          />
          <Text strong className="mb-2">
            {`${userInfo?.username}`}
          </Text>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ color: "#1890ff" }}
          >
            Выход
          </Button>
        </div>
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
