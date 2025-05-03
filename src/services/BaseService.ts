import { BaseModel } from '@thomascsd/stools-models';
import { HttpService } from './HttpService';
import {
  AirtableDeletion,
  AirtableRecord,
  AirtableResult,
  AirtableUpdateResult,
  SelectOptions,
} from '../dtos';

/**
 * Provides foundational methods for interacting with the Airtable API.
 * This class serves as a base for more specialized Airtable service implementations.
 * It encapsulates common operations like retrieving, creating, updating, and deleting records.
 *
 * @export
 * @abstract
 * @class BaseService
 */
export abstract class BaseService {
  /**
   * Initializes a new instance of the BaseService class.
   * Protected constructor to prevent direct instantiation.
   * @protected
   */
  protected constructor() {}

  /**
   * Retrieves multiple records from a specified Airtable table, optionally applying query parameters.
   * Maps the Airtable record structure to the provided generic type `T`.
   *
   * @protected
   * @template T - The type extending BaseModel that represents the structure of the records.
   * @param {string} token - The Airtable Personal Access Token for authentication.
   * @param {string} baseId - The ID of the target Airtable base.
   * @param {string} tableName - The name or ID of the target table within the base.
   * @param {SelectOptions} [options] - Optional parameters for filtering, sorting, pagination, etc. See Airtable API documentation for details.
   * @returns {Promise<T[]>} A promise that resolves to an array of records matching the query, cast to type T.
   * @memberof BaseService
   */
  protected async get<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    const airtable = this.getAirTableClient(token, baseId);
    const mapping = await airtable.list(tableName, options);
    const records = mapping.records;

    const body = records
      .map((o: AirtableRecord) => {
        const fields = o.fields;
        fields.id = o.id;
        return fields;
      })
      .map((fields) => {
        const obj: Record<string, unknown> = { ...fields };
        return obj;
      }) as T[];

    return body;
  }

  /**
   * Creates a single new record in the specified Airtable table.
   *
   * @protected
   * @template T - The type extending BaseModel representing the record to create.
   * @param {string} token - The Airtable Personal Access Token for authentication.
   * @param {string} baseId - The ID of the target Airtable base.
   * @param {string} tableName - The name or ID of the target table.
   * @param {T} model - The data object representing the record to be created. The `id` property, if present, will be ignored by Airtable.
   * @returns {Promise<AirtableResult>} A promise that resolves to the Airtable API response for the created record.
   * @memberof BaseService
   */
  protected async save<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableResult> {
    const airtable = this.getAirTableClient(token, baseId);
    const body = await airtable.create(tableName, model);
    return body;
  }

  /**
   * Updates an existing record in the specified Airtable table using its record ID.
   *
   * @protected
   * @template T - The type extending BaseModel representing the record to update. Must include the `id` property.
   * @param {string} token - The Airtable Personal Access Token for authentication.
   * @param {string} baseId - The ID of the target Airtable base.
   * @param {string} tableName - The name or ID of the target table.
   * @param {T} model - The data object containing the fields to update. It **must** include the `id` property of the record to update.
   * @returns {Promise<AirtableUpdateResult>} A promise that resolves to the Airtable API response for the updated record.
   * @memberof BaseService
   */
  protected async update<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableUpdateResult> {
    const airtable = this.getAirTableClient(token, baseId);
    const tmpModel = { ...model };
    const id = tmpModel.id;
    delete tmpModel.id;
    const result = await airtable.update(tableName, id as string, tmpModel);

    return result;
  }

  /**
   * Deletes a single record from the specified Airtable table using its record ID.
   *
   * @protected
   * @template T - The type extending BaseModel representing the record to delete. Must include the `id` property.
   * @param {string} token - The Airtable Personal Access Token for authentication.
   * @param {string} baseId - The ID of the target Airtable base.
   * @param {string} tableName - The name or ID of the target table.
   * @param {T} model - The object representing the record to delete. It **must** include the `id` property.
   * @returns {Promise<AirtableDeletion>} A promise that resolves to the Airtable API response confirming the deletion.
   * @memberof BaseService
   */
  protected async delete<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableDeletion> {
    const airtable = this.getAirTableClient(token, baseId);

    const res = await airtable.delete(tableName, model.id as string);
    return res;
  }

  /**
   * Creates and returns an instance of the HttpService configured for a specific Airtable base.
   * This method centralizes the creation of the HTTP client used for API interactions.
   *
   * @private
   * @param {string} token - The Airtable Personal Access Token.
   * @param {string} baseId - The ID of the Airtable base.
   * @returns {HttpService} An instance of HttpService ready to communicate with the specified Airtable base.
   * @memberof BaseService
   */
  private getAirTableClient(token: string, baseId: string): HttpService {
    const airtable = new HttpService(token, baseId);

    return airtable;
  }
}
