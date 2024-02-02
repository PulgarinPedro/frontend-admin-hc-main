// ModalEditUsuarios.tsx
import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import * as usuariosApi from '../services/usuariosApi';

interface ModalEditUsuarioProps {
  usuarioid: number;
  onEditSuccess: () => void;
}

const ModalEditUsuario: React.FC<ModalEditUsuarioProps> = ({ usuarioid, onEditSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const usuario = await usuariosApi.fetchUsuario(usuarioid);
        form.setFieldsValue({
          nombreUsuario: usuario.nombreUsuario,
          password: usuario.password,
        });
      } catch (error) {
        console.error('Error al obtener datos del usuario para editar:', error);
      }
    };

    obtenerDatosUsuario();
  }, [usuarioid, form]);

  const onFinish = async (values: any) => {
    try {
      console.log('Form Values:', values);

      // Crear un objeto FormData y agregar los valores extraídos
      const formData = new FormData();
      formData.append('usuarioid', usuarioid.toString());
      formData.append('nombreUsuario', values.nombreUsuario);
      formData.append('password', values.password);


      console.log('Data to send:', usuarioid, values); // Añadir este log

      console.log('FormData:', formData);

      await usuariosApi.updateUsuario(usuarioid, formData);

      message.success('Usuario editado correctamente');
      onEditSuccess();
    } catch (error:any) {
      console.error('Error al editar usuario', error);
      message.error(`Error al editar usuario: ${error.message}`);
    }
  };

  return (
    <Form form={form} name="form_edit_habitacion" layout="vertical" onFinish={onFinish}>
      <Form.Item name="nombreUsuario" label="Nombre del usuario" rules={[{ required: true, message: 'Ingrese el nombre del usuario' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Password">
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default ModalEditUsuario;
