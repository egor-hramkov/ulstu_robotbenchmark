import { Button, Col, Row, Card } from "antd";
import "./ProblemDetail.css"; // Basic CSS for additional styling if needed
import { useEffect, useState } from "react";
import { Problem, apiClientClass } from "../../shared/api";
import { ApiConfig } from "../../shared/api/http-client";
import { useAuthStore } from "../../store/useAuthStore";
import { useParams } from "react-router-dom";

export const ProblemDetail = () => {
  const [problem, setProblem] = useState<Problem>();
  const token = useAuthStore((state) => state.token);
  const params = useParams();

  const configMcc: ApiConfig = {
    baseUrl: "http://localhost:8000",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const apiClient = new apiClientClass(configMcc);

  useEffect(() => {
    if (params.id) {
      apiClient.Problems.problemRetrieve(Number(params.id)).then((res) => {
        setProblem(res.data.problem);
      });
    }
  }, [params.id]);

  return (
    <div className="problem-detail-container">
      {problem ? (
        <Row gutter={16} style={{ height: "100vh" }}>
          <Col span={12} className="editor-col">
            <h1>{problem.title}</h1>
            <div></div>
          </Col>
          <Col span={12} className="robot-col">
            <Card
              title={problem.title}
              bordered={false}
              style={{ height: "90%" }}
            >
              <p>{problem.description}</p>
            </Card>
            <Button
              type="primary"
              onClick={() => {}}
              style={{ marginRight: 8 }}
            >
              Start
            </Button>
            <Button onClick={() => {}}>Exit</Button>
          </Col>
        </Row>
      ) : (
        <h1>Ничего нет</h1>
      )}
    </div>
  );
};

export default ProblemDetail;
