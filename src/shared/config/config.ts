// URL
export const API_BASE_URL: string =
    process.env.REACT_APP_API_BASE_URL || 'https://fortniteapi.io/v2';

// API ключ
export const API_KEY: string = process.env.REACT_APP_API_BASE_URL || '';

// Функция для сборки URL
export const buildApiUrl = (path: string) => `${API_BASE_URL}/${path}`