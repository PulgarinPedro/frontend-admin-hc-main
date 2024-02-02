import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/usuariosApi'; // Ajusta la ruta según la ubicación de tu archivo
import './Login.css'; // Importa tu archivo de estilos CSS
import logo from './logo-hosteria-cap.png';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Hacer la solicitud a la API para autenticar al usuario
      const { user, token } = await loginUsuario({ nombreUsuario: username, password });

      // Llamada a la función de inicio de sesión
      onLogin(username);

      // Redirigir a la página principal o a la ruta deseada
      navigate('/');
    } catch (error) {
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="login-container background-image ">
            <img src={logo} alt="Logo" className="logo" />

      <div className="login-content">
        
        <h2>Login</h2>
        <div className="form-group">
          <label>Nombre de Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="login-button" onClick={handleLogin}>Iniciar Sesión</button>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default Login;
