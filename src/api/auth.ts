import { API_KEY } from '../shared/config/config';

let authToken: string | null = null; // кэш в памяти

async function fetchNewToken(): Promise<string> {
  return Promise.resolve(API_KEY); // сейчас просто используем токен из конфига
}

export async function getAuthToken(): Promise<string> {
  const newToken = await fetchNewToken();
  authToken = newToken;

  return authToken;
}