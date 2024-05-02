import { Modal, Form, Input, DatePicker } from 'antd';

const CreateTournamentModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

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
      </Form>
    </Modal>
  );
};

export default CreateTournamentModal;
