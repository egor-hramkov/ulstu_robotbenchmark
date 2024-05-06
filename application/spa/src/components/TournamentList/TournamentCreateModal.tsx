import { Modal, Form, Input, DatePicker, Select, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { apiClientClass } from '../../shared/api';
import { ApiConfig } from '../../shared/api/http-client';
import { useAuthStore } from '../../store/useAuthStore';
import { DefaultOptionType } from 'antd/es/select';
import { debounce } from 'lodash';
import DebounceSelect from '../../ui/header/Select/DebounceSelect';

const CreateTournamentModal = ({ visible, onCreate, onCancel }) => {
  const [options, setOptions] = useState<DefaultOptionType[] | undefined>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [form] = Form.useForm();
  const token = useAuthStore((state) => state.token);

  const configMcc: ApiConfig = {
    baseUrl: "http://localhost:8000",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const apiClient = new apiClientClass(configMcc);

  const fetchUsers = useCallback(async (username?: string) => {
    await apiClient.Users.usersList({username: username}).then((value) => {
      setOptions(value.data.map((item) => ({ label: item.username, value: item.id })));
    });
  }, [])

  useEffect(() => {
      fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (value: string) => {
    setFetching(true);
    fetchUsers(value);
  }; // Задержка в миллисекундах

  return (
    <Modal
      visible={visible}
      title="Создать соревнование"
      okText="Создать"
      cancelText="Закрыть"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            values.date_start = values.date_start.toISOString(); // Convert moment object to ISO string
            values.date_end = values.date_end.toISOString(); // Convert moment object to ISO string
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Название соревнования"
          rules={[
            { required: true, message: 'Please input the name of the tournament!' },
            { max: 255, message: 'Name must be 255 characters or less' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[
            { required: true, message: 'Please input the description of the tournament!' },
            { max: 5000, message: 'Description must be 5000 characters or less' }
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="date_start"
          label="Начало"
          rules={[{ required: true, message: 'Please select the start date and time!' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="date_end"
          label="Окончание"
          rules={[{ required: true, message: 'Please select the end date and time!' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="Пользователи" name="users" rules={[{ required: true, message: 'Please input!' }]}>
        <Select
      mode="multiple"
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      onSearch={(value) => handleSearch(value)}
      options={options}
    />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTournamentModal;
