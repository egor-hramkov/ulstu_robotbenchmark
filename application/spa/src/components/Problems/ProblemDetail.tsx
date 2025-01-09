import { Tabs, TabPaneProps, Spin, Modal, Button, Input, message } from "antd";
import "./ProblemDetail.css"; // Basic CSS for additional styling if needed
import { useEffect, useState } from "react";
import { Problem, ProblemUser, apiClientClass } from "../../shared/api";
import { ApiConfig } from "../../shared/api/http-client";
import { useAuthStore } from "../../store/useAuthStore";
import { useParams } from "react-router-dom";
import { useProblemsStore } from "../../store/useProblemsStore";
import useApiClient from "../../hooks/useApiClient";
import { ExportOutlined } from '@ant-design/icons';

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
  const params = useParams();

  const apiClient = useApiClient();

  useEffect(() => {
    if (params.id) {
      apiClient.UsersProblem.usersProblemRetrieve(Number(params.id)).then((res) => {
        console.log(res.data);
        setProblem(res.data);
      });
    }
  }, [params.id]);

  const handleFinishTournament = () => {
    setIsModalVisible(true);
  };

  const handleConfirmFinish = () => {
    setIsModalVisible(false);
    setIsCommandModalVisible(true);
  };

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
          VS Code <Button onClick={() => openInNewWindow(`http://localhost:${problem?.vs_port}`)} size="small" icon={<ExportOutlined />} />
        </span>
      ),
      children: (
        <iframe
          src={`http://localhost:${problem?.vs_port}`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
    {
      key: "2",
      label: (
        <span>
          Webots <Button onClick={() => openInNewWindow(`http://localhost:${problem?.webots_stream_port}/index.html`)} size="small" icon={<ExportOutlined />} />
        </span>
      ),
      children: (
        <iframe
          src={`http://localhost:${problem?.webots_stream_port}/index.html`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
    {
      key: "3",
      label: (
        <span>
          Редактор карты <Button onClick={() => openInNewWindow(`http://localhost:${problem?.robot_panel_port}`)} size="small" icon={<ExportOutlined />} />
        </span>
      ),
      children: (
        <iframe
          src={`http://localhost:${problem?.robot_panel_port}`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
  ];

  return (
    <div className="problem-detail-container">
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <h2>Детали задачи</h2>
        <Button onClick={handleFinishTournament} type="danger">Завершить соревнование</Button>
      </div>
      {problem ? (
        <Tabs style={{ height: "100vh" }} items={items} />
      ) : (
        <Spin size={"default"} />
      )}

      {/* Confirm Modal */}
      <Modal
        title="Подтверждение завершения"
        visible={isModalVisible}
        onOk={handleConfirmFinish}
        onCancel={() => setIsModalVisible(false)}
        okText="Подтвердить"
        cancelText="Отмена"
      >
        Вы уверены, что хотите завершить соревнование? Это действие нельзя отменить.
      </Modal>

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