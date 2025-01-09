import { Button, Card, Col, List, Row, Typography, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import { Tournament, User, Problem } from "../../shared/api";

const { Title, Text } = Typography;

export const OperatorTournament = () => {
  const [tournamentInfo, setTournamentInfo] = useState<Tournament | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const { id }: { id: string } = useParams();
  const apiClient = useApiClient();

  const fetchData = useCallback((id: number) => {
    apiClient.Tournament.tournamentRetrieve(+id)
      .then((res) => {
        setTournamentInfo(res.data);
        // Получаем участников
        setParticipants(res.data.users);

        // Получаем задачи по их ID
        const problemPromises = res.data.problems.map((problemId: number) =>
          apiClient.Problems.problemRetrieve(problemId)
        );
        Promise.all(problemPromises)
          .then((problemResponses) => {
            setProblems(problemResponses.map((pr) => pr.data));
          })
          .finally(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (id)
      // Получение информации о турнире
      fetchData(+id);
  }, [id, fetchData]);

  const handleFreezeTournament = async () => {
    await apiClient.Block.blockCreate(+id).then(() => fetchData(+id));
  };

  const handleStartVerification = () => {
    console.log("Начата проверка всех задач");
    // Добавьте API вызов для начала проверки
    navigate(`/operator/${+id}`)
  };

  const handleUserVerification = (userId: number) => {
    console.log(`Начата проверка для пользователя ID: ${userId}`);
    // Добавьте API вызов для начала проверки конкретного пользователя
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
      />
    );
  }

  return (
    <Row gutter={[20, 20]} style={{ height: "100%" }}>
      {/* Информация о турнире в две колонки */}
      <Col span={24}>
        <Card title="Информация о турнире" bordered>
          <Row>
            <Col span={12}>
              <Text strong>Название: </Text>
              <Text>{tournamentInfo?.name}</Text>
              <br />
              <Text strong>Описание: </Text>
              <Text>{tournamentInfo?.description}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Дата начала: </Text>
              <Text>
                {new Date(
                  tournamentInfo?.date_start || ""
                ).toLocaleDateString()}
              </Text>
              <br />
              <Text strong>Дата окончания: </Text>
              <Text>
                {new Date(tournamentInfo?.date_end || "").toLocaleDateString()}
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Список участников и задач */}
      <Col span={12}>
        <Card title="Список участников" bordered>
          <List
            bordered
            dataSource={participants}
            renderItem={(user) => (
              <List.Item>
                <Row style={{ width: "100%", alignItems: "center" }} justify="space-between">
                  <Col>
                    <Text>{user.username}</Text>
                  </Col>
                  <Col>
                    {user.first_name} {user.last_name}
                  </Col>
                  <Col>
                    <Text>{user.organization}</Text>
                  </Col>
                  <Col>
                    <Text>{user.team}</Text>
                  </Col>
                  <Col>
                    <Button
                      type="primary" 
                      onClick={() => handleUserVerification(user.id)}
                    >
                      Начать проверку
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Список задач" bordered>
          <List
            bordered
            dataSource={problems}
            renderItem={(problem) => (
              <List.Item>
                <Row style={{ width: "100%" }}>
                  <Col span={12}>
                    <Text strong>{problem.title}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">
                      {problem.description || "Описание отсутствует"}
                    </Text>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Col>

      {/* Кнопки управления */}
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          type="default"
          disabled={tournamentInfo?.is_blocked}
          onClick={handleFreezeTournament}
        >
          {tournamentInfo?.is_blocked
            ? "Соревнование заморожено"
            : "Заморозка соревнования"}
        </Button>
        <Button type="primary" onClick={handleStartVerification}>
          Начать проверку
        </Button>
      </Col>
    </Row>
  );
};
