import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { useAuthStore } from "../../store/useAuthStore";

type MenuItem = Required<MenuProps>['items'][number];

const is_super = useAuthStore().is_super;

const adminPoints: MenuItem[] = is_super ? [{
  key: '/users',
  label: 'Пользователи',
  icon: <UserOutlined />
}] : [];

export const menuPoints: MenuItem[] = [
  {
    key: "/leaderboard",
    label: "Турнирная таблица",
  },
  {
    key: "/problems",
    label: "Задачи",
  },
  {
    key: "/tournaments",
    label: "Турниры",
    icon: <TrophyOutlined />,
  },
  ...adminPoints
];
