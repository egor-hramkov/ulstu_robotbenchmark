import { Tabs, TabPaneProps, Spin, Modal, Button, Input, message } from "antd";
import "./ProblemDetail.css"; // Basic CSS for additional styling if needed
import { useEffect, useState } from "react";
import { ProblemUser } from "../../shared/api";
import { useAuthStore } from "../../store/useAuthStore";
import { useParams } from "react-router-dom";
import { useProblemsStore } from "../../store/useProblemsStore";
import useApiClient from "../../hooks/useApiClient";
import { ExportOutlined } from '@ant-design/icons';
import { ProblemEndingCountdown } from "./ProblemEndingCountdown";

export interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

export const ProblemDetail = () => {
  const [problem, setProblem] = useState<ProblemUser>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCommandModalVisible, setIsCommandModalVisible] = useState(false);
  const [launchCommand, setLaunchCommand] = useState("");
  const token = useAuthStore((state) => state.token);
  const { vs_code, robot_panel_port, webots_stream_port } = useProblemsStore();
  const { problemId, tournamentId } = useParams();

  const apiClient = useApiClient();
  const { userInfo } = useAuthStore();

  useEffect(() => {
    if (problemId) {
      apiClient.UsersProblem.usersProblemList({problem_id: Number(problemId), tournament_id: Number(tournamentId), user_id: userInfo?.id}).then((res) => {
        console.log(res.data);
        setProblem(res.data[0]);
      });
    }
  }, [problemId]);

  const handleLaunch = () => {
    if (!launchCommand.trim()) {
      message.error("Введите команду запуска!");
      return;
    }

    // Здесь можно сделать запрос на сервер с командой запуска
    message.success("Соревнование завершено и решение запущено!");
    setIsCommandModalVisible(false);
    setLaunchCommand(""); // Очистить поле после завершения
  };

  // Function to open a new window with the specified URL
  const openInNewWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const items: Tab[] = [
    {
      key: "1",
      label: (
        <span>
          VS Code <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${problem?.vs_port}`)} size="small" icon={<ExportOutlined />} />
        </span>
      ),
      children: (
        <iframe
          src={`https://virtual.robocross.ru:${problem?.vs_port}`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
    {
      key: "2",
      label: (
        <span>
          Webots <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${problem?.webots_stream_port}/index.html`)} size="small" icon={<ExportOutlined />} />
        </span>
      ),
      children: (
        <iframe
          src={`https://virtual.robocross.ru:${problem?.webots_stream_port}/index.html`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
    {
      key: "3",
      label: (
        <span>
          Редактор карты <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:8000:${problem?.robot_panel_port}`)} size="small" icon={<ExportOutlined />} />
        </span>
      ),
      children: (
        <iframe
          src={`https://virtual.robocross.ru:${problem?.robot_panel_port}`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
  ];

  return (
    <div className="problem-detail-container">
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <h2>Задача: {problem?.problem}</h2>
        <div>
      <ProblemEndingCountdown tournamentId={Number(tournamentId)} />
    </div>
      </div>
      {problem ? (
        <Tabs style={{ height: "100vh" }} items={items} />
      ) : (
        <Spin size={"default"} />
      )}

      {/* Command Input Modal */}
      <Modal
        title="Введите команду запуска"
        visible={isCommandModalVisible}
        onOk={handleLaunch}
        onCancel={() => setIsCommandModalVisible(false)}
        okText="Запустить"
        cancelText="Отмена"
      >
        <Input
          placeholder="Введите команду запуска..."
          value={launchCommand}
          onChange={(e) => setLaunchCommand(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ProblemDetail;