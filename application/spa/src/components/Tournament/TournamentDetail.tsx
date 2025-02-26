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
  const [tournament, setTournament] = useState<Tournament>();
  const [issuesInWork, setIssuesInWork] = useState<ProblemUser[]>();
  const [showTournamentEdit, setShowTournamentEdit] = useState<
    number | boolean
  >(false);

  
  const { userInfo } = useAuthStore();

  const navigate = useNavigate();
  const apiClient = useApiClient();

  const continueUserProblem = useCallback((problem: number) => {
    apiClient.UsersProblem.usersProblemRetrieve(problem).then(({ data }) => {
      navigate(`/problems/${data.problem}/${params.id}`);
    });
  }, []);

  const findIssue = (id: number) => {
    if (issuesInWork) {
      const issue = issuesInWork.find((issue) => issue.problem === id);
      return { issueStatus: issue?.status, userProblemId: issue?.id };
    } else return null
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
      }).then(({ data }) => setIssuesInWork(data));
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
                    {findIssue(item) !== null && findIssue(item)?.issueStatus === StatusEnum.IN_PROGRESS  ? (
                      <>
                        Задача #{item}
                        <Button
                          type="default"
                          disabled={tournament.is_blocked}
                          onClick={() => continueUserProblem(findIssue(item)?.userProblemId!)}
                          icon={<PlayCircleFilled />}
                          className="continue-btn"
                        >
                          Продолжить выполнение задачи
                        </Button>
                      </>
                    ) : findIssue(item)?.issueStatus === StatusEnum.CREATED ? (
                      <>
                        Задача #{item}
                        <Button
                          type="primary"
                          disabled={tournament.is_blocked}
                          onClick={() => continueUserProblem(findIssue(item)?.userProblemId!)}
                          icon={<PlayCircleFilled />}
                        >
                          Запустить задачу
                        </Button>
                      </>
                    ) : findIssue(item)?.issueStatus === StatusEnum.CHECKED || StatusEnum.COMPLETED || StatusEnum.QUARANTINE || StatusEnum.REWORK ? 
                      <>
                        Задача #{item}
                        <Button
                          type="default"
                          disabled={true}
                          icon={<BugOutlined />}
                        >
                          Задача на проверке, либо выполнена
                        </Button>
                      </> : <></>
                  }
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
                  <Col style={{ flex: 1 }}>
                    <Text>{user.username}</Text>
                  </Col>
                  <Col style={{ flex: 1 }}>
                    <Text>{user.first_name} {user.last_name}</Text>
                  </Col>
                  <Col style={{ flex: 1 }}>
                    <Text>{user.organization}</Text>
                  </Col>
                  <Col style={{ flex: 1 }}>
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
