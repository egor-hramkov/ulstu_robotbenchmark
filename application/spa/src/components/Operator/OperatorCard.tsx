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
} from "antd";
import { useCallback, useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import { Tournament, User, Problem, ProblemUser } from "../../shared/api";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useOperatorStore } from "./store/useOperatorStore";

const { Title, Text } = Typography;

export const OperatorCard = () => {
  const [tournamentInfo, setTournamentInfo] = useState<Tournament>();
  const [participants, setParticipants] = useState<User[]>([]);
  const [currentProblem, setCurrentProblem] = useState<ProblemUser | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [teamCommand, setTeamCommand] = useState("");

  const { id } = useParams();

  const { nextProblem, lastProblem, setProblems, problems, currentIndex } =
    useOperatorStore((state) => state);

  const apiClient = useApiClient();

  const fetchCurrentProblem = useCallback((problemId: number) => {
    apiClient.UsersProblem;
  }, []);

  useEffect(() => {
    if (id) {
      apiClient.Tournament.tournamentRetrieve(+id).then((res) => {
        setTournamentInfo(res.data);
        setParticipants(res.data.users);
        setProblems(res.data.problems);
        fetchCurrentProblem(res.data.problems[0]);
      });
    }
  }, [id, setProblems]);

  const currentParticipant = participants[currentIndex % participants.length];

  // Tabs for the current problem
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

  const handleOk = () => {
    console.log("Score submitted:", score);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row gutter={20} style={{ height: "100%" }}>
      {/* Left Part */}
      <Col span={16}>
        <Card style={{ height: "100%" }}>
          <Title level={3} style={{ textAlign: "left", marginBottom: 10 }}>
            Проверка турнира: {tournamentInfo?.name || "Загрузка..."}
          </Title>
          <Text
            style={{ display: "block", textAlign: "left", marginBottom: 20 }}
          >
            Текущий участник:{" "}
            <strong>
              {currentParticipant?.username || "Неизвестный участник"}
            </strong>
          </Text>
          <Card
            style={{
              height: "550px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs defaultActiveKey="1" style={{ flex: 1 }} items={tabsItems} />
          </Card>
          <Row style={{ marginTop: 30 }} justify={"space-between"}>
            <Button icon={<LeftOutlined />} onClick={lastProblem} />
            <Button type="default" onClick={showModal}>
              Оценить задачу
            </Button>
            <Button icon={<RightOutlined />} onClick={nextProblem} />
          </Row>
        </Card>
      </Col>

      {/* Right Part */}
      <Col span={8}>
        <Card title="Список задач">
          <List
            bordered
            dataSource={problems}
            renderItem={(problem, index) => {
              const isCurrent = currentIndex === index;
              const isChecked = problem.checked;

              let backgroundColor = "#f5f5f5";

              if (isCurrent)
                backgroundColor = "#faad14"; // Highlight current problem
              else if (isChecked) backgroundColor = "#52c41a"; // Highlight checked problems

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
            renderItem={(user) => {
              const isCurrent = currentParticipant?.id === user.id;

              return (
                <List.Item
                  style={{
                    backgroundColor: isCurrent ? "#faad14" : "#f5f5f5",
                    color: isCurrent ? "white" : "black",
                    fontWeight: isCurrent ? "bold" : "normal",
                  }}
                >
                  {user.username}
                </List.Item>
              );
            }}
          />
        </Card>

        {/* Team Command Input Field */}
        {/* Team Command Display */}
        <Card title="Команда для запуска" style={{ marginTop: 20 }}>
          <Text>ros2 run my_package my_node</Text>
        </Card>
      </Col>

      {/* Modal for Score Submission */}
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
