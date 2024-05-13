import { useCallback, useEffect, useState } from "react";
import { apiClientClass } from "../../shared/api";
import { ApiConfig } from "../../shared/api/http-client";
import { useAuthStore } from "../../store/useAuthStore";
import { User } from "../../shared/api/data-contracts";
import { Col, FloatButton, List, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TournamentList from "../Tournament/TournamentList";
import { UsersCreate } from "./UsersCreate";

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUserCreate, setShowUserCreate] = useState<boolean>(false);
  const { token } = useAuthStore();

  const configMcc: ApiConfig = {
    baseUrl: "http://localhost:8000",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const apiClient = new apiClientClass(configMcc);

  const fetchUsers = useCallback(() => {
    apiClient.Users.usersList().then(({ data }) => setUsers(data));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onCreate = (values: User) => {
    apiClient.Users.usersCreate({
      ...values,is_superuser: values.is_superuser ?? false
    }).then(() => {
      setShowUserCreate(false);
      fetchUsers();
    });
  };

  return (
    <div>
      <h1>Пользователи</h1>
      <UsersCreate
        visible={showUserCreate}
        onCreate={onCreate}
        onCancel={() => setShowUserCreate(false)}
      />
      <List
        bordered
        dataSource={users}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <Row>
              <Col>{item.username}</Col>
              <Col>{item.first_name}</Col>
              <Col>{item.last_name}</Col>
              <Col>{item.email}</Col>
              <Col>{item.is_superuser}</Col>
            </Row>
          </List.Item>
        )}
      />
      <FloatButton
        shape="square"
        tooltip={<>Создать пользователя</>}
        type="primary"
        style={{ right: 42 }}
        onClick={() => setShowUserCreate(true)}
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default TournamentList;
