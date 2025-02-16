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
        <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
          <>
            VS Code
          </>
          <Button onClick={() => openInNewWindow(`https://virtual.robocross.ru:${problem?.vs_port}`)} size="small" icon={<ExportOutlined />} />
          <Button onClick={() => vscodeFrameRef.current?.contentWindow?.location.reload()} size="small" icon={<ReloadOutlined />} />
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
          <Button onClick={() => webotsFrameRef.current?.contentWindow?.location.reload()} size="small" icon={<ReloadOutlined />} />
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
            <Button onClick={() => mapFrameRef.current?.contentWindow?.location.reload()} size="small" icon={<ReloadOutlined />} />
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