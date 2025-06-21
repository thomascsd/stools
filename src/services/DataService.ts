import { Service } from 'typedi';
import { BaseModel } from '../dtos';
import { BaseService } from './BaseService';
import { AirtableResult, AirtableDeletion, SelectOptions, AirtableUpdateResult } from '../dtos';

/**
 * A service designed for dependency injection (using typedi) to interact with Airtable.
 * It extends BaseService and exposes its CRUD methods publicly.
 * Inject this service into other services or controllers to access Airtable data.
 *
 * @example
 * ```typescript
 * import { Service } from 'typedi';
 * import { DataService, BaseModel } from '@thomascsd/stools';
 *
 * // Define your Airtable model
 * export class Contact extends BaseModel {
 *   name: string;
 *   email: string;
 * }
 *
 * const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
 * const BASE_ID = 'appXXXXXXXXXXXXXX';
 * const TABLE_NAME = 'Contacts';
 *
 * @Service()
 * export class ContactService {
 *   constructor(private db: DataService) {}
 *
 *   async getContacts(): Promise<Contact[]> {
 *     return await this.db.getDatas<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME);
 *   }
 *
 *   async saveContact(contact: Contact) {
 *    return await this.db.saveData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
 *   }
 *
 *   async updateContact(contact: Contact) {
 *    return await this.db.updateData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
 *   }
 *
 *   async deleteContact(contact: Contact) {
 *    return await this.db.deleteData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
 *   }
 * }
 * ```
 *
 * @export
 * @class DataService
 * @extends {BaseService}
 */
@Service()
export class DataService extends BaseService {
  /**
   * Initializes a new instance of the DataService class.
   * Calls the constructor of the BaseService.
   */
  constructor() {
    super();
  }

  /**
   * Retrieves multiple records from the specified Airtable table.
   * Publicly exposes the `get` method from BaseService.
   *
   * @template T - The type extending BaseModel representing the record structure.
   * @param {string} token - The Airtable Personal Access Token.
   * @param {string} baseId - The ID of the Airtable base.
   * @param {string} tableName - The name or ID of the table.
   * @param {SelectOptions} [options] - Optional query parameters.
   * @returns {Promise<T[]>} A promise resolving to an array of records.
   * @memberof DataService
   */
  async getData<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    return await super.get<T>(token, baseId, tableName, options);
  }

  /**
   * Creates a new record in the specified Airtable table.
   * Publicly exposes the `save` method from BaseService.
   *
   * @template T - The type extending BaseModel representing the record to create.
   * @param {string} token - The Airtable Personal Access Token.
   * @param {string} baseId - The ID of the Airtable base.
   * @param {string} tableName - The name or ID of the table.
   * @param {T} model - The data for the new record.
   * @returns {Promise<AirtableResult>} A promise resolving to the Airtable API response.
   * @memberof DataService
   */
  async saveData<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableResult> {
    return await super.save<T>(token, baseId, tableName, model);
  }

  /**
   * Updates an existing record in the specified Airtable table.
   * Publicly exposes the `update` method from BaseService.
   *
   * @template T - The type extending BaseModel representing the record to update (must include `id`).
   * @param {string} token - The Airtable Personal Access Token.
   * @param {string} baseId - The ID of the Airtable base.
   * @param {string} tableName - The name or ID of the table.
   * @param {T} model - The data containing updates, including the record `id`.
   * @returns {Promise<AirtableUpdateResult>} A promise resolving to the Airtable API response.
   * @memberof DataService
   */
  async updateData<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableUpdateResult> {
    return await super.update<T>(token, baseId, tableName, model);
  }

  /**
   * Deletes a record from the specified Airtable table.
   * Publicly exposes the `delete` method from BaseService.
   *
   * @template T - The type extending BaseModel representing the record to delete (must include `id`).
   * @param {string} token - The Airtable Personal Access Token.
   * @param {string} baseId - The ID of the Airtable base.
   * @param {string} tableName - The name or ID of the table.
   * @param {T} model - An object containing the `id` of the record to delete.
   * @returns {Promise<AirtableDeletion>} A promise resolving to the Airtable API response.
   * @memberof DataService
   */
  async deleteData<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableDeletion> {
    return await super.delete<T>(token, baseId, tableName, model);
  }
}
