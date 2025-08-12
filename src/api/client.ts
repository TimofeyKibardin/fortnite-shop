import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from "../shared/config/config";
import { getAuthToken } from './auth';

/** Ошибка единого формата */
export class ApiError extends Error {
  status: number;
  payload?: unknown;
  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

// Экземпляр axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Ключ авторизации
api.interceptors.request.use(async (config) => {
    const token = await getAuthToken(); // получаем токен из кэша или создаём новый
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Единый вызов запроса
api.interceptors.response.use(
    (res) => res,   // Успех
    (error: AxiosError) => {    // Ошибка
        if (error.response) {
            const status = error.response.status;
            const payload = error.response.data;
            const message =
                (payload as any)?.message ||
                (payload as any)?.error ||
                `HTTP ${status}`;

            return Promise.reject(new ApiError(message, status, payload));
        }

        const msg = error.message || 'Network error';
        return Promise.reject(new ApiError(msg, 0));
    }
);