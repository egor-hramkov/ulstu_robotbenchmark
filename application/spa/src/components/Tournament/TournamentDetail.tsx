import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProblemUser, Tournament } from "../../shared/api";
import { useAuthStore } from "../../store/useAuthStore";
import { Row, Col, Card, List, Button, Flex, FloatButton } from "antd";
import { BugOutlined, EditOutlined, PlayCircleFilled } from "@ant-design/icons";
import { useProblemsStore } from "../../store/useProblemsStore";
import "./TournamentDetail.scss";
import { TournamentEdit } from "./TournamentEdit";
import useApiClient from "../../hooks/useApiClient";

export const TournamentDetail = () => {
  const params = useParams();
  const { userId } = useAuthStore();
  const setLevelData = useProblemsStore((state) => state.setData);
  const [tournament, setTournament] = useState<Tournament>();
  const [issuesInWork, setIssuesInWork] = useState<ProblemUser[]>();
  const [showTournamentEdit, setShowTournamentEdit] = useState<
    number | boolean
  >(false);

  const navigate = useNavigate();
  const apiClient = useApiClient();

  const startUserProblem = useCallback((userId: number, problemId: number) => {
    apiClient.UsersProblem.usersProblemCreate({
      user: userId,
      problem: problemId,
      points: 1231313,
      is_completed: false,
      id: 10,
      robot_panel_port: 104504,
      vs_port: 104503,
      webots_stream_port: 104505
    }).then(({ data }) => {
      setLevelData(
        data.vs_port,
        data.webots_stream_port,
        data.problem,
        data.robot_panel_port
      );
      navigate(`/problems/${data.id}`);
    });
  }, []);

  const continueUserProblem = useCallback((problem: number) => {
    apiClient.UsersProblem.usersProblemRetrieve(problem).then(({ data }) => {
      setLevelData(
        10302,
        11891,
        1,
        10048
      );
      navigate(`/problems/${data.problem}`);
    });
  }, []);

  const findIssue = (id: number) => {
    if (issuesInWork)
      for (let i = 0; i < issuesInWork.length; i++) {
        if (issuesInWork[i].id === id) {
          return issuesInWork[i].id;
        } else return false;
      }
  };

  useEffect(() => {
    if (params.id) {
      apiClient.Tournament.tournamentRetrieve(Number(params.id)).then(
        (item) => {
          setTournament(item.data);
          console.log(item.data);
        }
      );
      apiClient.UsersProblem.usersProblemList({
        tournament_id: Number(params.id),
      }).then(({ data }) => setIssuesInWork(data));
    }
  }, [params.id]); 

  const editData = useCallback((data: Tournament) => {
    if (params.id) 
    apiClient.Tournament.tournamentUpdate(Number(params.id), data).then(({ data }) =>
      setTournament(data)
    );
  }, []);

  const blockTournament = () => {
    if (tournament?.id)
    apiClient.Block.blockCreate(tournament?.id).then(() => navigate(`/operator/${tournament.id}`));
  }

  if (tournament) {
    return (
      <Row gutter={16}>
        <FloatButton
          shape="square"
          tooltip={<>Редактировать соревнование</>}
          type="primary"
          style={{ right: 42 }}
          onClick={() => setShowTournamentEdit(Number(params.id))}
          icon={<EditOutlined />}
        />
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
                    {findIssue(item) ? (
                      <>
                        Задача #{item}
                        <Button
                          type="default"
                          disabled={tournament.is_blocked}
                          onClick={() => continueUserProblem(findIssue(item))}
                          icon={<PlayCircleFilled />}
                          className="continue-btn"
                        >
                          Продолжить выполнение задачи
                        </Button>
                      </>
                    ) : (
                      <>
                        Задача #{item}
                        <Button
                          type="primary"
                          disabled={tournament.is_blocked}
                          onClick={() => startUserProblem(userId, item)}
                          icon={<PlayCircleFilled />}
                        >
                          Запустить задачу
                        </Button>
                      </>
                    )}
                  </Flex>
                </List.Item>
              )}
            />
          </Card>
          <Button style={{marginTop: 20}} type="dashed" onClick={() => blockTournament()} icon={<BugOutlined />}>
            Начать проверку заданий
          </Button>
        </Col>
        <Col span={12}>
          <Card title="Участники">
            <List
              bordered
              dataSource={tournament.users}
              renderItem={(user) => (
                <List.Item>Участник #{user.first_name}</List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    );
  }
};
