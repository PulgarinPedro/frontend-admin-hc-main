import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HabitacionesTable from './pages/Habitaciones';
import RootLayout from './layouts/RootLayout';
import { Home } from './pages/Home';
import ReservasTable from './pages/Reservas';
import UsuariosTable from './pages/Usuarios';
import Login from './components/Login';
import './App.css'; // Nuevo archivo CSS para estilos generales de la aplicación

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Rutas protegidas que requieren inicio de sesión */}
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="habitaciones" element={<HabitacionesTable />} />
      <Route path="reservas" element={<ReservasTable />} />
      <Route path="usuarios" element={<UsuariosTable />} />

    </Route>
  </Routes>
);

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      {user ? (
  <div className="authenticated">
    <h2>Bienvenido, {user}!</h2>
    <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
    <AppRoutes />
  </div>
) : (
  <Login onLogin={handleLogin} />
)}
    </Router>
  );
};

export default App;