import {
  Button,
  Card,
  Col,
  List,
  Row,
  Tabs,
  Typography,
  Modal,
  Form,
  Input,
  Spin,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import { Tournament, User, Problem, ProblemUser } from "../../shared/api";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useOperatorStore } from "./store/useOperatorStore";

const { Title, Text } = Typography;

export const OperatorCard = () => {
  const { nextProblem, lastProblem, setProblems, problems, currentIndex } =
    useOperatorStore((state) => state);

  const [tournamentInfo, setTournamentInfo] = useState<Tournament>();
  const [participants, setParticipants] = useState<User[]>([]);
  const [currentProblem, setCurrentProblem] = useState<ProblemUser | null>(null);
  const [currentParticipant, setCurrentParticipant] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState("");

  const { id } = useParams();
  const apiClient = useApiClient();

  // Загружаем данные турнира при инициализации компонента
  useEffect(() => {
    if (id) {
      setLoading(true);
      apiClient.Tournament.tournamentRetrieve(+id).then((res) => {
        setTournamentInfo(res.data);
        setParticipants(res.data.users);
        setProblems(res.data.problems);
        setLoading(false);
        if (res.data.users.length > 0) {
          setCurrentParticipant(res.data.users[0]); // Устанавливаем первого участника по умолчанию
        }
      }).catch(error => {
        console.error("Ошибка при загрузке турнира:", error);
        setLoading(false);
      });
    }
  }, [id, setProblems]);

  // Функция для получения текущей проблемы
  const fetchCurrentProblem = useCallback((problemId: number) => {
    if (tournamentInfo && currentParticipant) {
      apiClient.UsersProblem.usersProblemList({
        is_checked: undefined,
        ordering: undefined,
        problem_id: problemId,
        tournament_id: tournamentInfo.id,
        user_id: currentParticipant.id
      }).then(({ data }) => {
        if (data.length === 1) {
          setCurrentProblem(data[0]);
          setNoDataMessage("");
        } else {
          setCurrentProblem(null);
          setNoDataMessage("Информация о задаче отсутствует.");
        }
      }).catch(error => {
        console.error("Ошибка при получении проблемы:", error);
        setNoDataMessage("Ошибка при загрузке задачи.");
      });
    }
  }, [currentParticipant, tournamentInfo]);

  // Установка текущей проблемы при изменении текущего участника
  useEffect(() => {
    if (currentParticipant && tournamentInfo && tournamentInfo.problems.length > 0) {
      fetchCurrentProblem(tournamentInfo.problems[0]); // Передаем ID первой проблемы
    }
  }, [currentParticipant, tournamentInfo]);

  // Определяем элементы для табов
  const tabsItems = currentProblem
    ? [
        {
          key: "1",
          label: "VS Code",
          children: (
            <iframe
              src={`http://localhost:${currentProblem.vs_port}`}
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          ),
        },
        {
          key: "2",
          label: "Webots",
          children: (
            <iframe
              src={`http://localhost:${currentProblem.webots_stream_port}/index.html`}
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          ),
        },
        {
          key: "3",
          label: "Редактор карты",
          children: (
            <iframe
              src={`http://localhost:${currentProblem.robot_panel_port}`}
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          ),
        },
      ]
    : [];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      if (currentProblem) {
        // Обновляем задачу с оценкой
        await apiClient.UsersProblem.usersProblemPartialUpdate(currentProblem.id, { score });
        // Устанавливаем цвет задачи в зеленый после успешной оценки
        setProblems((prevProblems) => {
          return prevProblems.map(problem => {
            if (problem.id === currentProblem.id) {
              return { ...problem, checked: true }; // Устанавливаем задачу как проверенную
            }
            return problem;
          });
        });
        setNoDataMessage(""); // Сбрасываем сообщение
      }
    } catch (error) {
      console.error("Ошибка при оценке задачи:", error);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Обработчик клика на участника
  const handleParticipantClick = (participant: User) => {
    setCurrentParticipant(participant);
    setNoDataMessage(""); // Сбрасываем сообщение при выборе нового участника
  };

  return (
    <Row gutter={20} style={{ height: "100%" }}>
      <Col span={16}>
        <Card style={{ height: "100%" }}>
          <Title level={3} style={{ marginBottom: 10 }}>
            Проверка турнира: {tournamentInfo?.name || "Загрузка..."}
          </Title>
          <Text style={{ display: "block", marginBottom: 20 }}>
            Текущий участник:{" "}
            <strong>{currentParticipant?.username || "Неизвестный участник"}</strong>
          </Text>
          <Card style={{ height: "100%", display: "flex", flexDirection: "column", flexGrow: 1 }}>
            {loading ? (
              <Spin size="large" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            ) : (
              <>
                {noDataMessage ? (
                  <Text style={{ textAlign: 'center' }}>{noDataMessage}</Text>
                ) : (
                  <Tabs defaultActiveKey="1" style={{ flex: 1 }} items={tabsItems} />
                )}
              </>
            )}
          </Card>
          <Row style={{ marginTop: 30 }} justify={"space-between"}>
            <Button icon={<LeftOutlined />} onClick={lastProblem} />
            <Button type="default" onClick={showModal}>Оценить задачу</Button>
            <Button icon={<RightOutlined />} onClick={nextProblem} />
          </Row>
        </Card>
      </Col>

      <Col span={8}>
        <Card title="Список задач">
          <List
            bordered
            dataSource={problems}
            renderItem={(problem, index) => {
              const isCurrent = currentIndex === index;
              const isChecked = problem.checked;

              let backgroundColor = "#f5f5f5";

              if (isCurrent) backgroundColor = "#faad14"; // Подсветка текущей проблемы
              else if (isChecked) backgroundColor = "#52c41a"; // Подсветка проверенных проблем

              return (
                <List.Item
                  key={index}
                  style={{
                    backgroundColor,
                    color: isCurrent ? "white" : "black",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {problem.issueName}
                </List.Item>
              );
            }}
          />
        </Card>

        <Card title="Список участников" style={{ marginTop: 20 }}>
          <List
            bordered
            dataSource={participants}
            renderItem={(user) => (
              <List.Item
                onClick={() => handleParticipantClick(user)} // Обработчик клика
                style={{
                  cursor: "pointer", // Указатель курсора для интерактивного элемента
                  backgroundColor: currentParticipant?.id === user.id ? "#faad14" : "#f5f5f5",
                  color: currentParticipant?.id === user.id ? "white" : "black",
                  fontWeight: currentParticipant?.id === user.id ? "bold" : "normal",
                }}
              >
                {user.username}
              </List.Item>
            )}
          />
        </Card>
      </Col>

      {/* Модальное окно для оценки */}
      <Modal
        title="Оценка задачи"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Количество баллов">
            <Input
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};