import axios, { AxiosResponse } from 'axios';

export const reservasApiUrl = 'http://localhost:3001/reservas';

export interface Reserva {
  reservaid:number; 
  habitacionid: number;
  nombreCliente: string;
  correoCliente: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroCliente: string;
}

export const fetchReservas = async (): Promise<Reserva[]> => {
    const response: AxiosResponse<Reserva[]> = await axios.get(reservasApiUrl);
    return response.data;
  };
export const createReserva = async (data: Reserva | FormData): Promise<Reserva> => {
  const response: AxiosResponse<Reserva> = await axios.post(reservasApiUrl, data);
  return response.data;
};

export const fetchReserva = async (reservaid: number): Promise<Reserva> => {
  const url = `${reservasApiUrl}/${reservaid}`;
  const response: AxiosResponse<Reserva> = await axios.get(url);
  return response.data;
};

export const deleteReserva = async (reservaid: number): Promise<void> => {
  const url = `${reservasApiUrl}/${reservaid}`;
  await axios.delete(url);
};

export const updateReserva = async (reservaid: number, reservaData: Reserva | FormData): Promise<Reserva> => {
  const url = `${reservasApiUrl}/${reservaid}`;

  // Verificar si usuarioData es FormData o un objeto Usuario
  const response: AxiosResponse<Reserva> = await axios.put(url, reservaData, {
    headers: {
      'Content-Type': 'application/json', // Cambiar a 'application/json' si no es FormData
    },
  });

  return response.data;
};
