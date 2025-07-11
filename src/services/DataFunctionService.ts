import { BaseService } from './BaseService';
import {
  AirtableResult,
  AirtableDeletion,
  SelectOptions,
  AirtableUpdateResult,
  BaseModel,
} from '../dtos';

/**
 * Defines  service that access AirTable's data
 *
 * @export
 * @class DataFunctionService
 * @extends {BaseService}
 */
export class DataFunctionService extends BaseService {
  /**
   * Creates an instance of DataFunctionService.
   * Stores the provided token and base ID for subsequent API calls.
   *
   * @param {string} token - The Airtable Personal Access Token. This will be used for all operations performed by this instance.
   * @param {string} baseId - The ID of the Airtable base this instance will interact with.
   */
  constructor(public token: string, public baseId: string) {
    super();
  }

  /**
   * Retrieves records from a specified table within the configured base.
   * Uses the token and baseId provided during instantiation.
   *
   * @template T - The type extending BaseModel representing the record structure.
   * @param {string} tableName - The name or ID of the target table.
   * @param {SelectOptions} [options] - Optional query parameters.
   * @returns {Promise<T[]>} A promise resolving to an array of records.
   * @memberof DataFunctionService
   */
  async getData<T extends BaseModel>(tableName: string, options?: SelectOptions): Promise<T[]> {
    return await super.get<T>(this.token, this.baseId, tableName, options);
  }

  /**
   * Creates a new record in the specified table within the configured base.
   * Uses the token and baseId provided during instantiation.
   *
   * @template T - The type extending BaseModel representing the record to create.
   * @param {string} tableName - The name or ID of the target table.
   * @param {T} model - The data for the new record.
   * @returns {Promise<AirtableResult>} A promise resolving to the Airtable API response.
   * @memberof DataFunctionService
   */
  async saveData<T extends BaseModel>(tableName: string, model: T): Promise<AirtableResult> {
    return await super.save<T>(this.token, this.baseId, tableName, model);
  }

  /**
   * Updates an existing record in the specified table within the configured base.
   * Uses the token and baseId provided during instantiation.
   *
   * @template T - The type extending BaseModel representing the record to update (must include `id`).
   * @param {string} tableName - The name or ID of the target table.
   * @param {T} model - The data containing updates, including the record `id`.
   * @returns {Promise<AirtableUpdateResult>} A promise resolving to the Airtable API response.
   * @memberof DataFunctionService
   */
  async updateData<T extends BaseModel>(
    tableName: string,
    model: T
  ): Promise<AirtableUpdateResult> {
    return await super.update<T>(this.token, this.baseId, tableName, model);
  }

  /**
   * Deletes a record from the specified table within the configured base.
   * Uses the token and baseId provided during instantiation.
   *
   * @template T - The type extending BaseModel representing the record to delete (must include `id`).
   * @param {string} tableName - The name or ID of the target table.
   * @param {T} model - An object containing the `id` of the record to delete.
   * @returns {Promise<AirtableDeletion>} A promise resolving to the Airtable API response.
   * @memberof DataFunctionService
   */
  async deleteData<T extends BaseModel>(tableName: string, model: T): Promise<AirtableDeletion> {
    return await super.delete<T>(this.token, this.baseId, tableName, model);
  }
}
