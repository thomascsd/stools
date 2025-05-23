import got from 'got';
import {
  AirtableList,
  AirtableResult,
  AirtableDeletion,
  SelectOptions,
  AirtableUpdateResult,
} from '../dtos';

/**
 * HttpService class to interact with the Airtable API.
 */
export class HttpService {
  /**
   * The base URL for the Airtable API.
   */
  url: string;

  /**
   * Creates an instance of HttpService.
   * @param token - The API token for authentication.
   */
  constructor(private token: string, private baseId: string) {
    this.url = `https://api.airtable.com/v0/`;
  }

  /**
   * Lists records from a specified base and table.
   * @param tableName - The name of the table.
   * @param options - Optional parameters for selecting records.
   * @returns A promise that resolves to an AirTableListMapping object.
   */
  async list(tableName: string, options?: SelectOptions): Promise<AirtableList> {
    this.url += `${this.baseId}/${tableName}`;
    let query = {};
    if (options) {
      query = options;
    }

    const data = await got
      .get(this.url, {
        headers: { Authorization: this.getToken() },
        searchParams: query,
      })
      .json<AirtableList>();
    return data;
  }

  /**
   * Creates a new record in a specified base and table.
   * @param tableName - The name of the table.
   * @param body - The data to be inserted as a new record.
   * @returns A promise that resolves to an AirTableCreateMapping object.
   */
  async create(tableName: string, body: Record<string, unknown>): Promise<AirtableResult> {
    this.url += `${this.baseId}/${tableName}`;

    const transformedBody = {
      records: [
        {
          fields: body,
        },
      ],
    };

    const result = await got
      .post(this.url, {
        headers: { Authorization: this.getToken() },
        json: transformedBody,
      })
      .json<AirtableResult>();
    return result;
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
    this.url += `${this.baseId}/${tableName}/${recordId}`;

    const transformedBody = {
      fields: body,
    };

    const result = await got
      .patch(this.url, {
        headers: { Authorization: this.getToken() },
        json: transformedBody,
      })
      .json<AirtableUpdateResult>();
    return result;
  }

  /**
   * Deletes a record from a specified base and table.
   * @param tableName - The name of the table.
   * @param recordId - The ID of the record to be deleted.
   * @returns A promise that resolves to an AirTableDeleteMapping object.
   */
  async delete(tableName: string, recordId: string): Promise<AirtableDeletion> {
    this.url += `${this.baseId}/${tableName}/${recordId}`;
    const data = await got
      .delete(this.url, {
        headers: {
          Authorization: this.getToken(),
        },
      })
      .json<AirtableDeletion>();
    return data;
  }

  /**
   * Generates the authorization token for API requests.
   * @returns The authorization token as a string.
   */
  private getToken() {
    return 'Bearer ' + this.token;
  }
}
