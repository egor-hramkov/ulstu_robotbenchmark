import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

import {
  ControlOutlined, // Иконка для модерации
  OrderedListOutlined, // Иконка для задач
  BarChartOutlined, // Иконка для турнирной таблицы
} from '@ant-design/icons';

const adminPoints: MenuItem[] = [{
  key: '/users',
  label: 'Пользователи',
  icon: <UserOutlined />,
}];

export const menuPoints: MenuItem[] = [
  {
    key: "/leaderboard",
    label: "Турнирная таблица",
    icon: <BarChartOutlined />, // Иконка для турнирной таблицы
  },
  {
    key: "/problems",
    label: "Задачи",
    icon: <OrderedListOutlined />, // Иконка для задач
  },
  {
    key: "/tournaments",
    label: "Турниры",
    icon: <TrophyOutlined />, // Иконка для турниров
  },
  {
    key: "/operator",
    label: 'Модерация',
    icon: <ControlOutlined />, // Иконка для модерации
  },
  ...adminPoints,
];
