// ModalAddUser.tsx

import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import * as usuariosApi from '../services/usuariosApi';

interface ModalAddUsuarioProps {
  visible: boolean;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const ModalAddUser: React.FC<ModalAddUsuarioProps> = ({ visible, onCancel, onAddSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // Crear un objeto de tipo Usuario sin incluir usuarioid
      const usuarioData: usuariosApi.Usuario = {
        nombreUsuario: values.nombreUsuario,
        password: values.password,
      };

      // Intentar crear el usuario con el objeto Usuario
      const createdUsuario = await usuariosApi.createUsuario(usuarioData);

      // Resto del código
      message.success('Usuario agregado correctamente');
      form.resetFields();
      onCancel();
      onAddSuccess();
    } catch (errorUsuario: any) {
      console.error('Error al agregar usuario con Usuario:', errorUsuario);
      message.error(`Error al agregar usuario: ${errorUsuario.message}`);
    }
  };

  return (
    <Modal title="Agregar Usuario" visible={visible} onCancel={onCancel} footer={null}>
      <Form form={form} name="form_add_usuario" layout="vertical" onFinish={onFinish}>
        <Form.Item name="nombreUsuario" label="Nombre de Usuario" rules={[{ required: true, message: 'Ingrese el nombre de usuario' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Ingrese la contraseña' }]}>
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Agregar Usuario
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalAddUser;
