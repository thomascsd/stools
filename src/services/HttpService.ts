import got from 'got';
import { AirTableGetMapping } from '../dtos/airTableGetMapping.js';

export class HttpService {
  url: string;

  constructor() {
    this.url = `https://api.airtable.com/v0/`;
  }

  async list(baseId: string, tableName: string): Promise<AirTableGetMapping> {
    this.url += `${baseId}/${tableName}`;
    const data = await got.get(this.url).json<AirTableGetMapping>();
    return data;
  }

  async post<T>(url: string, body: Record<string, unknown>): Promise<T> {
    const response = await got.post(url, { json: body });
    return response.body as T;
  }

  async put<T>(url: string, body: Record<string, unknown>): Promise<T> {
    const response = await got.put(url, { json: body });
    return response.body as T;
  }
}
