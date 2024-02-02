import React, {useState} from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import * as reservasApi from '../services/reservasApi';

const { confirm } = Modal;

interface ModalDeleteReservaProps {
  reservaid: number;
  onDeleteSuccess: () => void;
}

const ModalDeleteReserva: React.FC<ModalDeleteReservaProps> = ({ reservaid, onDeleteSuccess }) => {
  const [isHovered, setIsHovered] = useState(false);

  const showDeleteConfirm = () => {
    confirm({
      title: '¿Está seguro de eliminar esta reserva?',
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
      await reservasApi.deleteReserva(reservaid);
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

export default ModalDeleteReserva;