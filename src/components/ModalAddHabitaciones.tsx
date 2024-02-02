import React, {useState} from 'react';
import { Form, Input, Button, message, Modal, Upload } from 'antd';
import * as habitacionesApi from '../services/habitacionesApi';
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload;

interface ModalAddHabitacionProps {
  visible: boolean;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const ModalAddHabitacion: React.FC<ModalAddHabitacionProps> = ({visible, onCancel, onAddSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList]= useState<any[]>([]);

  const onFinish = async (values: any) => {
    console.log('Valores del formulario:', values);
    console.log('Lista de archivos:', fileList);


    try {
      const formData = new FormData();
      formData.append('nombreHabitacion', values.nombreHabitacion);
      formData.append('descripcion', values.descripcion);
      formData.append('capacidad', values.capacidad.toString());
      formData.append('disponible', values.disponible || false); 

      if (values.imagenUrl && values.imagenUrl.file) {
        console.log('values.imagenUrl:', values.imagenUrl);
        console.log('values.imagenUrl.file:', values.imagenUrl.file);
        formData.append('imagenUrl', values.imagenUrl.file);
      }else {
        throw new Error('La imagen es requerida. Por favor, suba una imagen.');
      }

      console.log('FormData:', formData);

      await habitacionesApi.createHabitacion(formData);
      message.success('Habitación agregada correctamente');
      form.resetFields();
      setFileList([]); // Limpiar la lista de archivos después de guardar
      onCancel(); // Cerrar el modal
      onAddSuccess();
    } catch (error:any) {
      console.error('Error al agregar habitación:', error.message);
      message.error(`Error al agregar habitación: ${error.message}`);
    }
  };

  const onFileChange = (info: any) => {
    setFileList(info.fileList);
  };


  return (
    <Modal
      title="Agregar Habitación"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
    <Form form={form} name="form_add_habitacion" layout="vertical" onFinish={onFinish}>
      <Form.Item name="nombreHabitacion" label="Nombre de la Habitación" rules={[{ required: true, message: 'Ingrese el nombre de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: 'Ingrese la descripcion de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="capacidad" label="Capacidad" rules={[{ required: true, message: 'Ingrese la capacidad de la habitación' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item name="imagenUrl" label="Imagen">
          <Dragger
            name="imagenUrl"
            fileList={fileList}
            onChange={onFileChange}
            beforeUpload={() => false} // Prevent actual file upload for now
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Haz clic o arrastra el archivo para subir</p>
          </Dragger>
        </Form.Item>

      <Button type="primary" htmlType="submit">
        Agregar Habitación
      </Button>
    </Form>
    </Modal>
  );
};

export default ModalAddHabitacion;
