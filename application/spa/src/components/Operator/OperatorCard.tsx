import {
  Button,
  Card,
  Col,
  List,
  Row,
  Tabs,
  Typography,
  Modal,
  InputNumber,
  Spin,
  message,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import { Tournament, User, Problem, ProblemUser } from "../../shared/api";
import { LeftOutlined, RightOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ExportOutlined, ReloadOutlined } from "@ant-design/icons";
import { useOperatorStore } from "./store/useOperatorStore";

const { Title, Text } = Typography;

export const OperatorCard = () => {
  const { nextProblem, lastProblem, setProblems, problems, currentIndex, currentProblem, setCurrentProblem } =
    useOperatorStore((state) => state);

  const [tournamentInfo, setTournamentInfo] = useState<Tournament>();
  const [participants, setParticipants] = useState<User[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const webotsFrameRef = useRef<HTMLIFrameElement>(null);
  const vscodeFrameRef = useRef<HTMLIFrameElement>(null);
  const mapFrameRef = useRef<HTMLIFrameElement>(null);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { id } = useParams();
  const apiClient = useApiClient();

  const fetchUserTournamentProblemsList = async (userId: number, tournamentId: number) => {
   return apiClient.UsersProblem.usersProblemList({ user_id: userId, tournament_id: tournamentId });
  }

  // Загружаем данные турнира при инициализации компонента
  useEffect(() => {
    if (id) {
      setLoading(true);
      apiClient.Tournament.tournamentRetrieve(+id).then((res) => {
        setTournamentInfo(res.data);
        if (res.data.users.length > 0) {
          setCurrentParticipant(res.data.users[0]);
          fetchUserTournamentProblemsList(res.data.users[0].id, Number(id)).then(({data}) => setProblems(data));
        }
        setParticipants(res.data.users);
        setLoading(false);
      }).catch(error => {
        console.error("Ошибка при загрузке турнира:", error);
        setLoading(false);
      });
    }
  }, [id]);

  // Обработчик клика на участника
  const handleParticipantClick = useCallback((participant: User) => {
    setCurrentParticipant(participant);
    fetchUserTournamentProblemsList(participant.id, Number(id)).then(({data}) => setCurrentProblem(data[0])); 
    setNoDataMessage(""); // Сбрасываем сообщение при выборе нового участника
  }, [setCurrentParticipant, setProblems, problems, id]);

  // Обработчик оценки задачи
  const handleOk = async () => {
    try {
      if (currentProblem) {
        // Обновляем задачу с оценкой
        await apiClient.UsersProblem.usersProblemPartialUpdate(currentProblem.id, { points: score }).then(({data}) => {
          setCurrentProblem(data);
        });
        message.success("Задача успешно оценена!");

      }
    } catch (error) {
      console.error("Ошибка при оценке задачи:", error);
      message.error("Ошибка при оценке задачи.");
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const launchUserProblem = (userProblemId?: number) => {
    if (userProblemId)
    apiClient.LaunchUserProblem.launchUserProblemRetrieve(userProblemId);
  } 

  const restartUserProblem = (userProblemId?: number) => {
    if (userProblemId) {
      apiClient.Restart.vsCodeRestartRetrieve(userProblemId);
    }
  }

  const openInNewWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const reloadWithRandomQuery = (frameRef) => {
    const randomQuery = `?${Math.floor(Math.random() * 10000)}`;
    if (frameRef.current) {
      frameRef.current.src = frameRef.current.src.split('?')[0] + randomQuery;
    }
  };

  // Определяем элементы для табов
  const tabsItems = currentProblem
    ? [
        {
          key: "1",
          label: (
            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
              <>
                VS Code
              </>
              <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${currentProblem.vs_port}`)} size="small" icon={<ExportOutlined />} />
              <Button onClick={() => reloadWithRandomQuery(vscodeFrameRef)} size="small" icon={<ReloadOutlined />} />
            </div>
          ),
          children: (
            <iframe
              src={`https://virtual.robocross.ru:${currentProblem.vs_port}`}
              ref={vscodeFrameRef}
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          ),
          style: { height: "100%" },
        },
        {
          key: "2",
          label: (
            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
              <>
                Webots 
              </>
              <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${currentProblem.webots_stream_port}/index.html`)} size="small" icon={<ExportOutlined />} />
              <Button onClick={() => reloadWithRandomQuery(webotsFrameRef)} size="small" icon={<ReloadOutlined />} />
            </div>
          ),
          children: (
            <iframe
              ref={webotsFrameRef}
              src={`https://virtual.robocross.ru:${currentProblem.webots_stream_port}/index.html`}
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          ),
          style: { height: "100%" },
        },
        {
          key: "3",
          label: (
            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                <>
                  Редактор карты
                </>
                <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${currentProblem.robot_panel_port}`)} size="small" icon={<ExportOutlined />} />
                <Button onClick={() => reloadWithRandomQuery(mapFrameRef)} size="small" icon={<ReloadOutlined />} />
            </div>
          ),
          children: (
            <iframe
              ref={mapFrameRef}
              src={`https://virtual.robocross.ru:${currentProblem.robot_panel_port}`}
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          ),
          style: { height: "100%" },
        },
      ]
    : [];

  return (
    <Row gutter={20} style={{ height: "100%" }}>
      <Col span={isCollapsed ? 24 : 16} style={{ height: "100%" }}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }} className="operator-card">
          <Title level={3} style={{ marginBottom: 10 }}>
            Проверка турнира: {tournamentInfo?.name || "Загрузка..."}
          </Title>
          <Text style={{ display: "block", marginBottom: 20 }}>
            Текущий участник:{" "}
            <strong>{currentParticipant?.username || "Неизвестный участник"}</strong>
          </Text>
          <Text style={{ display: "block", marginBottom: 10}}>
            Команда для запуска:{" "}
            <strong>{currentProblem?.launch_command ?? '-'}</strong>
          </Text>
            {loading ? (
              <Spin size="large" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            ) : (
              <>
                {noDataMessage ? (
                  <Text style={{ textAlign: 'center' }}>{noDataMessage}</Text>
                ) : (
                  <Tabs defaultActiveKey="1" items={tabsItems} style={{ height: "100%" }} />
                )}
              </>
            )}
          
          <Row style={{ marginTop: 30 }} justify={"space-between"}>
            <Button icon={<LeftOutlined />} onClick={lastProblem} />
            <Button type="default" onClick={() => setIsModalVisible(true)}>Оценить задачу</Button>
            <Button disabled={!currentProblem?.id} type="primary" onClick={() => launchUserProblem(currentProblem?.id)}>Запустить решение</Button>
            <Button disabled={!currentProblem?.id} type="default" onClick={() => restartUserProblem(currentProblem?.id)}>Перезапустить решение</Button>
            <Button icon={<RightOutlined />} onClick={nextProblem} />
          </Row>
        </div>
      </Col>

      {!isCollapsed && (
        <Col span={8}>
          <Card title="Список задач">
            <List
              bordered
              dataSource={problems}
              renderItem={(problem, index) => {
                const isCurrent = currentIndex === index;
                const hasPoints = problem.points && problem.points > 0;

                let backgroundColor = "#f5f5f5";

                if (isCurrent) backgroundColor = "#faad14"; // Подсветка текущей проблемы
                else if (hasPoints) backgroundColor = "#52c41a"; // Подсветка проверенных проблем или проблем с баллами

                return (
                  <List.Item
                    key={index}
                    style={{
                      backgroundColor,
                      color: isCurrent ? "white" : "black",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {problem.problem}
                  </List.Item>
                );
              }}
            />
          </Card>
          <Card title="Список участников" style={{ marginTop: 20 }}>
            <List
              bordered
              dataSource={participants}
              renderItem={(participant) => {
                const isCurrent = currentParticipant?.id === participant.id;
                const allProblemsChecked = problems.every((problem) => problem.points && problem.points > 0);

                let backgroundColor = "#f5f5f5";

                if (isCurrent) backgroundColor = "#faad14"; // Подсветка текущего участника
                else if (allProblemsChecked) backgroundColor = "#52c41a"; // Подсветка участника, у которого все задачи проверены

                return (
                  <List.Item
                    key={participant.id}
                    style={{
                      backgroundColor,
                      color: isCurrent ? "white" : "black",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleParticipantClick(participant)}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', flex: 1}}>
                      <div>{participant.username}</div>
                      <div>{participant.team}</div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </Card>
          <Card title="Записи проездов" style={{ marginTop: 20 }}>
          <List
              bordered
              dataSource={currentProblem && Object.entries(currentProblem?.records)}
              renderItem={(problem, index) => {
                return (
                  <List.Item
                    key={index}
                  >
                    {`${problem[0]} -`}
                      <a href={`https://virtual.robocross.ru:444` + problem[1]} target="_blank">{" "}ссылка</a>
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      )}

      <Button
        type="primary"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      {/* Модальное окно для оценки */}
      <Modal
        title="Оценка задачи"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputNumber
          min={0}
          max={100}
          value={score}
          onChange={(value) => {if (value) setScore(value)}}
          style={{ width: "100%" }}
        />
      </Modal>
    </Row>
  );
};