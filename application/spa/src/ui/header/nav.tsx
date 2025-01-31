import { TrophyOutlined, UserOutlined, ControlOutlined, OrderedListOutlined, BarChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

const adminPoints: MenuItem[] = [
  {
    key: '/users',
    label: 'Пользователи',
    icon: <UserOutlined />,
  },
  {
    key: "/problems",
    label: "Задачи",
    icon: <OrderedListOutlined />,
  },
  {
    key: "/operator",
    label: 'Модерация',
    icon: <ControlOutlined />,
  },
];

export const getMenuPoints = (isAdmin: boolean | undefined): MenuItem[] => {
  const menuPoints: MenuItem[] = [
    {
      key: "/leaderboard",
      label: "Турнирная таблица",
      icon: <BarChartOutlined />,
    },
    {
      key: "/tournaments",
      label: "Турниры",
      icon: <TrophyOutlined />,
    },
  ];

  if (isAdmin) {
    menuPoints.push(...adminPoints);
  }

  return menuPoints;
};