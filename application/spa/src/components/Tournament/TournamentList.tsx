import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tournament } from "../../shared/api/data-contracts";
import { Card, Col, FloatButton, Row } from "antd";
import CreateTournamentModal from "./TournamentCreateModal";
import { PlusOutlined } from "@ant-design/icons";
import useApiClient from "../../hooks/useApiClient";

export const TournamentList = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [visible, setVisible] = useState(false);

  const apiClient = useApiClient();
  const navigate = useNavigate();

  const fetchTournaments = useCallback(() => {
    apiClient.Tournament.tournamentList()
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => console.error("Не удалось загрузить турниры:", error));

  }, []);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const onCreate = (values: Tournament) => {
    apiClient.Tournament.tournamentCreate({
      ...values,
    }).then(() => {
      setVisible(false);
      fetchTournaments();
    });
  };

  return (
    <div>
      <h1>Открытые турниры</h1>
      <CreateTournamentModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
      {tournaments && tournaments.length > 0 ? (
        <Row gutter={16} style={{ marginTop: 16 }}>
          {tournaments.map((tournament) => (
            <Col key={tournament.id} span={8} style={{ marginBottom: 16 }}>
              <Card
                title={tournament.name}
                bordered={true}
                hoverable
                onClick={() => navigate(`/tournaments/${tournament.id}`)}
              >
                <p>Описание: {tournament.description}</p>
                <p>Нажмите для просмотра деталей</p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Нет открытых турниров</p>
      )}
      <FloatButton
        shape="square"
        tooltip={<>Создать турнир</>}
        type="primary"
        style={{ right: 42 }}
        onClick={() => setVisible(true)}
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default TournamentList;
