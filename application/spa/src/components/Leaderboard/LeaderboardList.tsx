import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import { Table } from "antd"; // Импортируем компонент Table из Ant Design
import { Leaderboard } from "../../shared/api/data-contracts";

export const LeaderboardList = () => {
  const navigate = useNavigate();
  const apiClient = useApiClient();

  // Создаем состояние для хранения данных таблицы
  const [dataSource, setDataSource] = useState<Leaderboard[]>([]);

  useEffect(() => {
    // Получаем данные и устанавливаем их в состояние
    apiClient.Leaderboard.leaderboardList()
      .then((data) => {
        setDataSource(data.data); // Устанавливаем данные в состояние
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, [apiClient]);

  // Определяем колонки для таблицы
  const columns = [
    {
      title: "Пользователь",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Общие очки",
      dataIndex: "total_points",
      key: "total_points",
      render: (_text, record) => `${record.total_points ?? "-"}`, // Сортировка по очкам
    },
  ];

  return (
    <div>
      <h1>Турнирная таблица</h1>
      <Table
        dataSource={dataSource} // Привязываем данные
        columns={columns} // Привязываем колонки
        rowKey="username" // Указываем уникальный ключ для строк
        pagination={false} // Отключаем пагинацию, если не нужна
      />
    </div>
  );
};
