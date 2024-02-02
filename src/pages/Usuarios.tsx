import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModalAddUser from '../components/ModalAddUsers';
import ModalDeleteUsuario from '../components/ModalDeleteUser';
import ModalEditUsuario from '../components/ModalEditUsers';
import * as usuariosApi from '../services/usuariosApi';

interface DataType {
  key: string;
  usuarioid: number;
  nombreUsuario: string;
  password: string;
}

const UsuariosTable: React.FC = () => {
  
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | null>(null);

  const obtenerDatosUsuarios = async () => {
    try {
      const usuarios = await usuariosApi.fetchUsuarios();
      const usuariosFormateados: DataType[] = usuarios.map((usuario) => ({
        key: usuario.usuarioid?.toString() || '', // Asegurarse de que usuarioid tenga un valor definido
        usuarioid: usuario.usuarioid || 0, // Asignar 0 si usuarioid es undefined
        nombreUsuario: usuario.nombreUsuario,
        password: usuario.password,
      }));
  
      setData(usuariosFormateados);
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    }
  };
  

  useEffect(() => {
    obtenerDatosUsuarios();
  }, []);

  const actualizarDatos = async () => {
    await obtenerDatosUsuarios();
  };

  const handleEditClick = (usuarioId: number) => {
    setSelectedUsuarioId(usuarioId);
    setModalVisible(true);
  };

  const handleEditSuccess = () => {
    setModalVisible(false);
    actualizarDatos();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'UsuarioID',
      dataIndex: 'usuarioid',
      key: 'usuarioid',
    },
    {
      title: 'Nombre_Usuario',
      dataIndex: 'nombreUsuario',
      key: 'nombreUsuario',
    },
    {
      title: 'Contraseña',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditClick(record.usuarioid)}>
            Editar
          </Button>
          <ModalDeleteUsuario usuarioid={record.usuarioid} onDeleteSuccess={actualizarDatos} />
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
        Agregar Usuario
      </Button>
      
      <ModalAddUser
        visible={modalAddVisible}
        onCancel={() => setModalAddVisible(false)}
        onAddSuccess={actualizarDatos}
      />
      <Table columns={columns} dataSource={data} />
      {modalVisible && (
        <Modal
          title="Editar Usuario"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <ModalEditUsuario
            usuarioid={selectedUsuarioId || 0}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </>
  );
};

export default UsuariosTable;
