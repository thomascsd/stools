import { request as httpsRequest } from 'https';
import { URL } from 'url';
import {
  AirtableList,
  AirtableResult,
  AirtableDeletion,
  SelectOptions,
  AirtableUpdateResult,
} from '../dtos';

/**
 * HttpService class to interact with the Airtable API using Node.js native https module.
 */
export class HttpService {
  /**
   * Creates an instance of HttpService.
   * @param token - The API token for authentication.
   * @param baseId - The Airtable base ID.
   */
  constructor(private token: string, private baseId: string) {}

  /**
   * Lists records from a specified base and table.
   * @param tableName - The name of the table.
   * @param options - Optional parameters for selecting records.
   * @returns A promise that resolves to an AirTableListMapping object.
   */
  async list(tableName: string, options?: SelectOptions): Promise<AirtableList> {
    const path = `${this.baseId}/${tableName}`;
    return this._request<AirtableList>('GET', path, undefined, options);
  }

  /**
   * Creates a new record in a specified base and table.
   * @param tableName - The name of the table.
   * @param body - The data to be inserted as a new record.
   * @returns A promise that resolves to an AirTableCreateMapping object.
   */
  async create(tableName: string, body: Record<string, unknown>): Promise<AirtableResult> {
    const path = `${this.baseId}/${tableName}`;
    const transformedBody = {
      records: [
        {
          fields: body,
        },
      ],
    };
    return this._request<AirtableResult>('POST', path, transformedBody);
  }

  /**
   * Updates an existing record in a specified base and table.
   * @param tableName - The name of the table.
   * @param recordId - The ID of the record to be updated.
   * @param body - The data to update the record with.
   * @returns A promise that resolves to an AirTableCreateMapping object.
   */
  async update(
    tableName: string,
    recordId: string,
    body: Record<string, unknown>
  ): Promise<AirtableUpdateResult> {
    const path = `${this.baseId}/${tableName}/${recordId}`;
    const transformedBody = { fields: body };
    return this._request<AirtableUpdateResult>('PATCH', path, transformedBody);
  }

  /**
   * Deletes a record from a specified base and table.
   * @param tableName - The name of the table.
   * @param recordId - The ID of the record to be deleted.
   * @returns A promise that resolves to an AirTableDeleteMapping object.
   */
  async delete(tableName: string, recordId: string): Promise<AirtableDeletion> {
    const path = `${this.baseId}/${tableName}/${recordId}`;
    return this._request<AirtableDeletion>('DELETE', path);
  }

  /**
   * Internal method to perform HTTP requests to Airtable API.
   * Handles query params, headers, body, and error cases.
   * @template T - Expected response type
   * @param method - HTTP method
   * @param path - API path after /v0/
   * @param body - Optional request body
   * @param query - Optional query params
   * @returns Promise<T>
   */
  private _request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    query?: Record<string, any>
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const baseUrl = 'https://api.airtable.com/v0/';
      const url = new URL(baseUrl + path);
      if (query && method === 'GET') {
        Object.entries(query).forEach(([k, v]) => {
          if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
        });
      }
      const headers: Record<string, string> = {
        Authorization: this.getToken(),
        'Content-Type': 'application/json',
      };
      const options = {
        method,
        headers,
      };

      const req = httpsRequest(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            if (res.statusCode && res.statusCode >= 400) {
              return reject(
                new Error(`Airtable API error: ${res.statusCode} ${res.statusMessage} - ${data}`)
              );
            }
            resolve(JSON.parse(data));
          } catch (err) {
            reject(new Error('Failed to parse response: ' + (err as Error).message));
          }
        });
      });

      req.on('error', (err) => reject(new Error('Network error: ' + err.message)));

      if (body && method !== 'GET') {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  /**
   * Generates the authorization token for API requests.
   * @returns The authorization token as a string.
   */
  private getToken() {
    return 'Bearer ' + this.token;
  }
}
