// ModalEditHabitacion.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import * as habitacionesApi from '../services/habitacionesApi';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


interface ModalEditHabitacionProps {
  habitacionid: number;
  onEditSuccess: () => void;
}

const ModalEditHabitacion: React.FC<ModalEditHabitacionProps> = ({ habitacionid, onEditSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);


  useEffect(() => {
    const obtenerDatosHabitacion = async () => {
      try {
        const habitacion = await habitacionesApi.fetchHabitacion(habitacionid);
        form.setFieldsValue({
          nombreHabitacion: habitacion.nombreHabitacion,
          descripcion: habitacion.descripcion,
          capacidad: habitacion.capacidad,
        });
      } catch (error) {
        console.error('Error al obtener datos de habitación para editar:', error);
      }
    };

    obtenerDatosHabitacion();
  }, [habitacionid, form]);
  
  const onFinish = async (values: any) => {
    try {
      // Añadir el id de la habitación para identificarla en la solicitud
      values.id = habitacionid;
    
      // Subir la nueva imagen solo si se selecciona una
      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append('imagenUrl', fileList[0].originFileObj);
        
        // Agregar otros campos al FormData
        formData.append('nombreHabitacion', values.nombreHabitacion);
        formData.append('descripcion', values.descripcion);
        formData.append('capacidad', values.capacidad);
        
        await habitacionesApi.updateHabitacion(habitacionid, formData);
      } else {
        // Si no se selecciona una nueva imagen, realizar la actualización sin subir imagen
        await habitacionesApi.updateHabitacion(habitacionid, values);
      }
    
      message.success('Habitación editada correctamente');
      onEditSuccess();
    } catch (error) {
      console.error('Error al editar habitación', error);
      message.error('Error al editar habitación');
    }
  };
  

  const onFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  return (
    <Form form={form} name="form_edit_habitacion" layout="vertical" onFinish={onFinish}>
      <Form.Item name="nombreHabitacion" label="nombre de la Habitación" rules={[{ required: true, message: 'Ingrese el nombre de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="descripcion" label="Descripción">
        <Input />
      </Form.Item>

      <Form.Item name="capacidad" label="Capacidad" rules={[{ required: true, message: 'Ingrese la capacidad de la habitación' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="nuevaImagenUrl" label="Nueva Imagen">
        <Dragger
          name="nuevaImagenUrl"
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
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default ModalEditHabitacion;