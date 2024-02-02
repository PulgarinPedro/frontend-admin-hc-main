import React, {useState} from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import * as usuariosApi from '../services/usuariosApi';

const { confirm } = Modal;

interface ModalDeleteUsuarioProps {
  usuarioid: number;
  onDeleteSuccess: () => void;
}

const ModalDeleteUsuario: React.FC<ModalDeleteUsuarioProps> = ({ usuarioid, onDeleteSuccess }) => {
  const [isHovered, setIsHovered] = useState(false);

  const showDeleteConfirm = () => {
    confirm({
      title: '¿Está seguro de eliminar este usuario?',
      icon: <ExclamationCircleFilled />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: handleDelete,
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = async () => {
    try {
      await usuariosApi.deleteUsuario(usuarioid);
      console.log('Usuario eliminado correctamente');
      onDeleteSuccess(); // Llamar a la función de éxito después de la eliminación
    } catch (error: any) {
      console.error('Error al eliminar el usuario:', error.message);
    }
  };

  const buttonStyle = {
    borderColor: isHovered ? 'red' : undefined,
    color: isHovered ? 'red' : undefined,
  };

  return (
    <Space wrap>
      <Button onClick={showDeleteConfirm}
       type="dashed"
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        Eliminar
      </Button>
    </Space>
  );
};

export default ModalDeleteUsuario;