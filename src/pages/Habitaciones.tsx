import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModalAddHabitacion from '../components/ModalAddHabitaciones';
import ModalDeleteHabitacion from '../components/ModalDeleteHabitacion';
import ModalEditHabitacion from '../components/ModalEditHabitacion';
import * as habitacionesApi from '../services/habitacionesApi';

interface DataType {
  key: string;
  habitacionid: number;
  nombreHabitacion: string;
  descripcion: string;
  capacidad: number;
  imagenUrl: string;
}

const HabitacionesTable: React.FC = () => {
  
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [selectedHabitacionId, setSelectedHabitacionId] = useState<number | null>(null);

  const obtenerDatosHabitaciones = async () => {
    try {
      const habitaciones = await habitacionesApi.fetchHabitaciones();
      const habitacionesFormateadas: DataType[] = habitaciones.map((habitacion) => ({
        key: habitacion.habitacionid.toString(),
        habitacionid: habitacion.habitacionid,
        nombreHabitacion: habitacion.nombreHabitacion,
        descripcion: habitacion.descripcion,
        capacidad: habitacion.capacidad,
        imagenUrl: habitacion.imagenUrl,
      }));

      setData(habitacionesFormateadas);
    } catch (error) {
      console.error('Error al obtener datos de habitaciones:', error);
    }
  };

  useEffect(() => {
    obtenerDatosHabitaciones();
  }, []);

  const actualizarDatos = async () => {
    await obtenerDatosHabitaciones();
  };

  const handleEditClick = (habitacionId: number) => {
    setSelectedHabitacionId(habitacionId);
    setModalVisible(true);
  };

  const handleEditSuccess = () => {
    setModalVisible(false);
    actualizarDatos();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'HabitacionID',
      dataIndex: 'habitacionid',
      key: 'habitacionid',
    },
    {
      title: 'Nombre_habitacion',
      dataIndex: 'nombreHabitacion',
      key: 'nombreHabitacion',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacidad',
      key: 'capacidad',
    },
    {
      title: 'Imagen',
      dataIndex: 'imagenUrl',
      key: 'imagenUrl',
      render: (imagenUrl) => <img src={imagenUrl} alt="Imagen de la habitación" style={{ maxWidth: '100px', maxHeight: '100px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditClick(record.habitacionid)}>
            Editar
          </Button>
          <ModalDeleteHabitacion habitacionid={record.habitacionid} onDeleteSuccess={actualizarDatos} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalAddVisible(true)}
      >
        Agregar Habitación
      </Button>
      
      <ModalAddHabitacion
        visible={modalAddVisible}
        onCancel={() => setModalAddVisible(false)}
        onAddSuccess={actualizarDatos}
      />
      <Table columns={columns} dataSource={data} />
      {modalVisible && (
        <Modal
          title="Editar Habitación"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <ModalEditHabitacion
            habitacionid={selectedHabitacionId || 0}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </>
  );
};

export default HabitacionesTable;
