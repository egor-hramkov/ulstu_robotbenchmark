import { List, Card, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Tournament } from "../../shared/api"; // Ваш тип данных
import useApiClient from "../../hooks/useApiClient";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const Operator = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]); // Состояние для турниров
  const [loading, setLoading] = useState<boolean>(true);
  const apiClient = useApiClient(); // Клиент для запросов
  const navigate = useNavigate(); // Хук для перехода на другую страницу

  useEffect(() => {
    // Запрос на сервер для получения списка турниров
    apiClient.Tournament.tournamentList()
      .then((res) => {
        setTournaments(res.data); // Устанавливаем турниры в состояние
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const onTournamentSelect = (id: number) => {
    // Переход к странице проверки задач (OperatorCard)
    navigate(`/operator-tournament/${id}`);
  };

  return (
    <>
      <Title level={3}>Раздел модерации турниров</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          dataSource={tournaments}
          bordered
          renderItem={(tournament) => (
            <List.Item
              key={tournament.id}
              onClick={() => onTournamentSelect(tournament.id)}
              style={{
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              <Card
                style={{ width: "100%" }}
                hoverable
                title={tournament.name}
              >
                {tournament.description || "Описание отсутствует"}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
