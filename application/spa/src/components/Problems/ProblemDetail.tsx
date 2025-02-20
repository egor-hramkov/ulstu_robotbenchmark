import { Tabs, TabPaneProps, Spin, Modal, Button, Input, message } from "antd";
import "./ProblemDetail.css"; // Basic CSS for additional styling if needed
import { useEffect, useRef, useState } from "react";
import { ProblemUser } from "../../shared/api";
import { useAuthStore } from "../../store/useAuthStore";
import { useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import { ExportOutlined, ReloadOutlined } from '@ant-design/icons';
import { ProblemEndingCountdown } from "./ProblemEndingCountdown";

export interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

export const ProblemDetail = () => {
  const [problem, setProblem] = useState<ProblemUser>();
  const webotsFrameRef = useRef<HTMLIFrameElement>(null);
  const vscodeFrameRef = useRef<HTMLIFrameElement>(null);
  const mapFrameRef = useRef<HTMLIFrameElement>(null);
  const [isCommandModalVisible, setIsCommandModalVisible] = useState(false);
  const [launchCommand, setLaunchCommand] = useState("");
  const { problemId, tournamentId } = useParams();

  const apiClient = useApiClient();
  const { userInfo } = useAuthStore();

  useEffect(() => {
    if (problemId) {
      apiClient.UsersProblem.usersProblemList({problem_id: Number(problemId), tournament_id: Number(tournamentId), user_id: userInfo?.id}).then((res) => {
        setProblem(res.data[0]);
      });
    }
  }, [problemId]);

  const handleLaunch = () => {
    if (!launchCommand.trim()) {
      message.error("Введите команду запуска!");
      return;
    }
    apiClient.UsersProblem.usersProblemPartialUpdate(Number(problem?.id), {launch_command: launchCommand}).then(() => {
      setIsCommandModalVisible(false);
      setLaunchCommand(""); // Очистить поле после завершения
    })
  };

  // Function to open a new window with the specified URL
  const openInNewWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const reloadWithRandomQuery = (frameRef) => {
    const randomQuery = `?${Math.floor(Math.random() * 10000)}`;
    if (frameRef.current) {
      frameRef.current.src = frameRef.current.src.split('?')[0] + randomQuery;
    }
  };

  const items: Tab[] = [
    {
      key: "1",
      label: (
        <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
          <>
            VS Code
          </>
          <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${problem?.vs_port}`)} size="small" icon={<ExportOutlined />} />
          <Button onClick={() => reloadWithRandomQuery(vscodeFrameRef)} size="small" icon={<ReloadOutlined />} />
        </div>
      ),
      children: (
        <iframe
          ref={vscodeFrameRef}
          src={`https://virtual.robocross.ru:${problem?.vs_port}`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
    {
      key: "2",
      label: (
        <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
          <>
            Webots 
          </>
          <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${problem?.webots_stream_port}/index.html`)} size="small" icon={<ExportOutlined />} />
          <Button onClick={() => reloadWithRandomQuery(webotsFrameRef)} size="small" icon={<ReloadOutlined />} />
        </div>
      ),
      children: (
        <iframe
          ref={webotsFrameRef}
          src={`https://virtual.robocross.ru:${problem?.webots_stream_port}/index.html`}
          style={{ height: "100%", width: "100%" }}
        />
      ),
      style: { height: "100%" },
    },
    {
      key: "3",
      label: (
        <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
            <>
              Редактор карты
            </>
            <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${problem?.robot_panel_port}`)} size="small" icon={<ExportOutlined />} />
            <Button onClick={() => reloadWithRandomQuery(mapFrameRef)} size="small" icon={<ReloadOutlined />} />
        </div>
      ),
      children: (
        <iframe
          ref={mapFrameRef}
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
      <div style={{display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end'}}>
        <ProblemEndingCountdown tournamentId={Number(tournamentId)} />
        <Button style={{marginLeft: 10}} type="default" onClick={() => setIsCommandModalVisible(true)}>Добавить команду запуска решения</Button>
      </div>
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
        okText="Сохранить"
        cancelText="Отмена"
        style={{marginTop: 20}}
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