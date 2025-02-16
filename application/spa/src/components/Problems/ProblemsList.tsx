import { useCallback, useEffect, useState } from "react";
import { Card, FloatButton, List } from "antd";
import { Problem } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import ProblemCreateModal from "./ProblemCreateModal";
import { PlusOutlined } from "@ant-design/icons";
import useApiClient from "../../hooks/useApiClient";

export const ProblemsList = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [visible, setVisible] = useState(false);

  const apiClient = useApiClient();

  const fetchProblems = useCallback(() => {
    apiClient.Problems.problemList()
      .then((response) => {
        if (response.data) {
          setProblems(response.data);
        }
      })
      .catch((error) => console.error("Failed to fetch problems:", error));
  }, []);

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleCreate = (problemDetails: Problem) => {
    apiClient.Problems.problemCreate({...problemDetails, author: 1}).then(() =>
      fetchProblems()
    );
    setVisible(false);
  };

  return (
    <>
      <FloatButton
        shape="square"
        tooltip={<>Создать задачу</>}
        type="primary"
        style={{ right: 42 }}
        onClick={() => setVisible(true)}
        icon={<PlusOutlined />}
      />
      <ProblemCreateModal
        visible={visible}
        onCreate={handleCreate}
        onCancel={() => setVisible(false)}
      />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={problems}
        renderItem={(problem) => (
          <List.Item style={{ height: "100%" }}>
            <Card
              title={problem.title}
              hoverable
            >
              <Card.Meta
                description={problem.description || "No description provided."}
              />
              <p>Difficulty: {problem.difficulty.toFixed(1)}</p>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ProblemsList;
