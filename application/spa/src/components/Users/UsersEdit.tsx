import { Modal, Form, Input, Checkbox } from "antd";
import { useEffect } from "react";
import InputMask from "react-input-mask";

const MESSAGE = 'Пожалуйста, заполните обязательное поле';

export const UsersEdit = ({ visible, onEdit, onCancel, data }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data)
    form.setFieldsValue({
      username: data.username,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      telegram: data.telegram,
      organization: data.organization,
      team: data.team,
      is_superuser: data.is_superuser,
    });
  }, [data]);

  return (
    <Modal
      open={visible}
      title="Редактировать пользователя"
      okText="Применить"
      cancelText="Закрыть"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values.phone = values.phone.slice(0, -1);
            form.resetFields();
            onEdit(values);
            onCancel();
          })
          .catch((info) => {
            console.log("Validation Failed: ", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={data}>
        <Form.Item
          name="username"
          label="Логин"
          rules={[
            {
              max: 150, 
              required: true, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              max: 128, 
              required: true, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="Имя"
          rules={[
            {
              max: 150, 
              required: true, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Фамилия"
          rules={[
            {
              max: 150, 
              required: true, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Адрес электронной почты"
          name="email"
          rules={[
            {
              max: 254, 
              required: true, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[
            {
              len: 19, 
              required: true, 
              message: MESSAGE, 
            }, 
          ]}
        >
          {/* @ts-expect-error Server Component */}
          <InputMask mask="+7 (999) 999 99-99" maskChar="_">
            {(inputProps: any) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>
        <Form.Item
          name="telegram"
          label="Telegram"
          rules={[
            {
              max: 50, 
              required: false, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input
            type="text" 
            addonBefore={<span style={{ color: 'gray' }}>@</span>} 
            onChange={(e) => {
              e.target.value = e.target.value.replace(/^@/, '');
            }} 
          />
        </Form.Item>
        <Form.Item
          name="organization"
          label="Название организации"
          rules={[
            {
              max: 150, 
              required: false, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="team"
          label="Название команды"
          rules={[
            {
              max: 50, 
              required: false, 
              message: MESSAGE, 
            }, 
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Является администратором" name="is_superuser">
          <Checkbox defaultChecked={false} value={false} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
