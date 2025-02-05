import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProblemUser, StatusEnum, Tournament } from "../../shared/api";
import { useAuthStore } from "../../store/useAuthStore";
import { Row, Col, Card, List, Button, Flex, FloatButton, Typography } from "antd";
import { BugOutlined, EditOutlined, PlayCircleFilled } from "@ant-design/icons";
import { useProblemsStore } from "../../store/useProblemsStore";
import "./TournamentDetail.scss";
import { TournamentEdit } from "./TournamentEdit";
import useApiClient from "../../hooks/useApiClient";

const Text = Typography;

export const TournamentDetail = () => {
  const params = useParams();
  const { userId } = useAuthStore();
  const setLevelData = useProblemsStore((state) => state.setData);
  const [tournament, setTournament] = useState<Tournament>();
  const [issuesInWork, setIssuesInWork] = useState<ProblemUser[]>();
  const [showTournamentEdit, setShowTournamentEdit] = useState<
    number | boolean
  >(false);

  
  const { userInfo } = useAuthStore();

  const navigate = useNavigate();
  const apiClient = useApiClient();

  const startUserProblem = useCallback((userId: number, problemId: number) => {
    apiClient.UsersProblem.usersProblemCreate({
      user: userId,
      problem: problemId,
      tournament: Number(params.id!),
      points: 10,
      id: 0,
      robot_panel_port: 0,
      vs_port: 0,
      webots_stream_port: 0,
      launch_command: '24124',
      status: StatusEnum.CREATED,
    }).then(({ data }) => {
      setLevelData(
        data.vs_port,
        data.webots_stream_port,
        data.problem,
        data.robot_panel_port
      );
      navigate(`/problems/${data.id}/${params.id}`);
    });
  }, []);

  const continueUserProblem = useCallback((problem: number) => {
    apiClient.UsersProblem.usersProblemRetrieve(problem).then(({ data }) => {
      navigate(`/problems/${data.problem}/${params.id}`);
    });
  }, []);

  const findIssue = (id: number) => {
    if (issuesInWork) {
      const issue = issuesInWork.find((issue) => issue.problem === id);
      return issue ? issue.id : null;
    }
    return null;
  };

  useEffect(() => {
    if (params.id) {
      apiClient.Tournament.tournamentRetrieve(Number(params.id)).then(
        (item) => {
          setTournament(item.data);
        }
      );
      apiClient.UsersProblem.usersProblemList({
        tournament_id: Number(params.id),
      }).then(({ data }) => {setIssuesInWork(data);console.log(data)});
    }
  }, [params.id]);

  const editData = useCallback((data: Tournament) => {
    if (params.id)
      apiClient.Tournament.tournamentUpdate(Number(params.id), data).then(
        ({ data }) => setTournament(data)
      );
  }, []);

  if (tournament) {
    return (
      <Row gutter={16}>
        {userInfo?.is_superuser &&         <FloatButton
          shape="square"
          tooltip={<>Редактировать соревнование</>}
          type="primary"
          style={{ right: 42 }}
          onClick={() => setShowTournamentEdit(Number(params.id))}
          icon={<EditOutlined />}
        />}
        <TournamentEdit
          visible={showTournamentEdit}
          onEdit={editData}
          data={tournament}
          onCancel={() => setShowTournamentEdit(false)}
        />
        <Col span={12}>
          <Card title="Информация о соревновании">
            <p>
              <strong>Название:</strong> {tournament?.name}
            </p>
            <p>
              <strong>Описание:</strong> {tournament?.description}
            </p>
            <p>
              <strong>Начало:</strong>{" "}
              {new Date(tournament.date_start).toLocaleString()}
            </p>
            <p>
              <strong>Окончание:</strong>{" "}
              {new Date(tournament.date_end).toLocaleString()}
            </p>
          </Card>
          <Card title="Задачи" style={{ marginTop: "20px" }}>
            <List
              bordered
              dataSource={tournament.problems}
              renderItem={(item) => (
                <List.Item>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{ width: "100%" }}
                  >
                    {/* {findIssue(item) ? (
                      <>
                        Задача #{item}
                        <Button
                          type="default"
                          disabled={tournament.is_blocked}
                          onClick={() => continueUserProblem(item)}
                          icon={<PlayCircleFilled />}
                          className="continue-btn"
                        >
                          Продолжить выполнение задачи
                        </Button>
                      </>
                    ) : ( */}
                      <>
                        Задача #{item}
                        <Button
                          type="primary"
                          disabled={tournament.is_blocked}
                          onClick={() => startUserProblem(userId!, item)}
                          icon={<PlayCircleFilled />}
                        >
                          Запустить задачу
                        </Button>
                      </>
                  
                  </Flex>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Участники">
            <List
              bordered
              dataSource={tournament.users}
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
                </Row>
              </List.Item>
            )}
            />
          </Card>
        </Col>
      </Row>
    );
  }
};
