import { Service } from 'typedi';
import { BaseModel } from '@thomascsd/stools-models';
import { BaseService } from './BaseService';
import { AirtableResult, AirtableDeletion, SelectOptions, AirtableUpdateResult } from '../dtos';

/**
 * Defines service that accesses AirTable's data, and uses DI with typedi.
 *
 * ```typescript
 * import { Service } from 'typedi';
 * import { DataService, BaseModel } from '@thomascsd/stools';
 *
 *
 * export class Contact extends BaseModel {
 *  name: string;
 *  email: string;
 *  mobile: string;
 * }
 *
 * @Service()
 * export class ContactService {
 *   constructor(private db: DataService) {}
 *
 *   async getContacts(): Promise<Contact[]> {
 *     return await this.db.getDatas<Contact>('<your API token of AirTable>', BASE_ID, '<your table name of AirTable>');
 *   }
 *
 *   async saveContact(contact: Contact) {
 *     return await this.db.saveData<Contact>('<your API token of AirTable>', BASE_ID, '<your table name of AirTable>', contact);
 *   }
 *
 *   async updateContact(contact: Contact) {
 *     return await this.db.updateData<Contact>('<your API token of AirTable>', BASE_ID, '<your table name of AirTable>', contact);
 *   }
 *
 *   async deleteContact(contact: Contact) {
 *     return await this.db.deleteData<Contact>('<your API token of AirTable>', BASE_ID, '<your table name of AirTable>', contact);
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
  constructor() {
    super();
  }

  /**
   * Get data from AirTable
   *
   * @template T
   * @param {string} token - API token
   * @param {string} baseId - Base ID of AirTable
   * @param {string} tableName - Table name in AirTable
   * @param {SelectOptions} [options] - Options for selecting data
   * @return {Promise<T[]>} - Promise resolving to an array of data
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
   * Insert data into AirTable
   *
   * @template T
   * @param {string} token - API token
   * @param {string} baseId - Base ID of AirTable
   * @param {string} tableName - Table name in AirTable
   * @param {T} model - Data model to insert
   * @return {Promise<AirtableResult>} - Promise resolving to the created record mapping
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
   * Update data in AirTable
   *
   * @template T
   * @param {string} token - API token
   * @param {string} baseId - Base ID of AirTable
   * @param {string} tableName - Table name in AirTable
   * @param {T} model - Data model to update
   * @return {Promise<AirtableResult>} - Promise resolving to the updated record mapping
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
   * Delete data from AirTable
   *
   * @template T
   * @param {string} token - API token
   * @param {string} baseId - Base ID of AirTable
   * @param {string} tableName - Table name in AirTable
   * @param {T} model - Data model to delete
   * @return {Promise<AirtableDeletion>} - Promise resolving to the deleted record mapping
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
