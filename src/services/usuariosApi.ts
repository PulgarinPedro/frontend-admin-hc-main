  import axios, { AxiosResponse } from 'axios';

  export const usuariosApiUrl = 'http://localhost:3001/usuarios';

  export interface Usuario {
    usuarioid?: number;
    nombreUsuario: string;
    password: string;
  }

  export const fetchUsuarios = async (): Promise<Usuario[]> => {
    const response: AxiosResponse<Usuario[]> = await axios.get(usuariosApiUrl);
    return response.data;
  };

  export const createUsuario = async (data: Usuario | FormData): Promise<Usuario> => {
    const response: AxiosResponse<Usuario> = await axios.post(usuariosApiUrl, data);
    return response.data;
  };

  export const fetchUsuario = async (usuarioid: number): Promise<Usuario> => {
    const url = `${usuariosApiUrl}/${usuarioid}`;
    const response: AxiosResponse<Usuario> = await axios.get(url);
    return response.data;
  };

  export const updateUsuario = async (usuarioid: number, usuarioData: Usuario | FormData): Promise<Usuario> => {
    const url = `${usuariosApiUrl}/${usuarioid}`;
  
    // Verificar si usuarioData es FormData o un objeto Usuario
    const response: AxiosResponse<Usuario> = await axios.put(url, usuarioData, {
      headers: {
        'Content-Type': 'application/json', // Cambiar a 'application/json' si no es FormData
      },
    });
  
    return response.data;
  };


  export const deleteUsuario = async (usuarioid: number): Promise<void> => {
    const url = `${usuariosApiUrl}/${usuarioid}`;
    await axios.delete(url);
  };
  export const fetchUsuarioByUsername = async (nombreUsuario: string): Promise<Usuario> => {
      const response: AxiosResponse<Usuario> = await axios.get(`${usuariosApiUrl}?nombreUsuario=${nombreUsuario}`);
      return response.data;
    };

    export const loginUsuario = async (credentials: { nombreUsuario: string; password: string }): Promise<{ user: Usuario; token: string }> => {
      const url = `${usuariosApiUrl}/login`;
      const response: AxiosResponse<{ user: Usuario; token: string }> = await axios.post(url, credentials);
      return response.data;
    };