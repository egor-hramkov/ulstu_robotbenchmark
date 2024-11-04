import { Button, Card, Col, List, Row } from "antd"
import { useEffect, useState } from "react"
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import { Tournament } from "../../shared/api";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useOperatorStore } from "./store/useOperatorStore";

export const OperatorCard = () => {
    const [tournamentInfo, setTournamentInfo] = useState<Tournament>();
    
    const { id }: {id: string} = useParams();
    const { nextProblem, lastProblem, setProblems, problems, currentIndex } = useOperatorStore((state) => state);

    const apiClient = useApiClient();

    useEffect(() => {
        if (id) {
            apiClient.Tournament.tournamentRetrieve(+id).then((res) => setProblems(res.data.problems))
        }
    }, [])

    return (
        <Row gutter={20} style={{height: '100%'}}>
            <Col span={16}>
                <Card style={{height: '100%'}} >
                    <Card style={{backgroundColor: 'black', minHeight: 550, color: 'white', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        Видео участника
                        </Card>
                    <Row style={{marginTop: 30}} justify={'space-between'}>
                        <Button icon={<LeftOutlined />} onClick={lastProblem} />
                        <Button type='default'>Оценить задачу</Button>
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
                // Determine the background color based on the state
                const isCurrent = currentIndex === index;
                const isChecked = problem.checked; // Assuming `checked` is part of your problem model
                let backgroundColor = '#f5f5f5'; // Default color

                if (isCurrent) {
                    backgroundColor = '#faad14'; // Warning color for current task
                } else if (isChecked) {
                    backgroundColor = '#52c41a'; // Success color for checked tasks
                }

                return (
                    <List.Item
                        key={index}
                        style={{
                            backgroundColor: backgroundColor,
                            color: isCurrent ? 'white' : 'black', // White text for current task, black for others
                            transition: 'background-color 0.3s ease', // Smooth transition effect
                        }}
                    >
                        {problem.issueName} {/* Update to use the proper property */}
                    </List.Item>
                );
            }}
            />
          </Card>
            </Col>
        </Row>
    )
}