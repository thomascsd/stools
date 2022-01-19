import { AirtableRecord, DeleteResponse, SelectOptions } from 'asyncairtable';
import { Service, Inject, Token } from 'typedi';
import { BaseModel } from '../models/BaseModel';
import { BaseService } from './BaseService';

const AIRTABLE_APIKEY_TOKEN = 'stools_AIRTABLE_APIKEY_TOKEN';

/**
 * Defines a token that get Airtable key
 */
export const API_KEY_TOKEN = new Token<string>(AIRTABLE_APIKEY_TOKEN);

/**
 * Defines service that access AirTable's data, and use DI with typedi.
 * 
 * ```typescript
 * import { Service, Container } from 'typedi';
 * import { DataService, BaseModel, API_KEY_TOKEN } from '@thomascsd/stools';

 * Container.set(API_KEY_TOKEN, process.env.<your api key>);

 * const BASE_ID = '<your base id>';

 * export class Contact extends BaseModel {
 *  name: string;
 *  email: string;
 *  mobile: string;
 * }
 *
 * @Service()
 * export class ContactService {
 * constructor(private db: DataService) {}
 *
 * async getContacts(): Promise<Contact[]> {
 *   return await this.db.getDatas<Contact>(BASE_ID, '<your table name of AirTable>');
 * }
 *
 * async saveContact(contact: Contact) {
 *   return await this.db.saveData<Contact>(BASE_ID, '<your table name of AirTable>', contact);
 * }
 *
 * async updateContact(contact: Contact) {
 *   return await this.db.updateData<Contact>(BASE_ID, '<your table name of AirTable>', contact);
 * }
 * }
 * ```
 * 
 * @export
 * @class DataService
 * @extends {BaseService}
 */
@Service()
export class DataService extends BaseService {
  constructor(@Inject(API_KEY_TOKEN) public apiKey: string) {
    super(apiKey);

    if (!this.apiKey) {
      this.apiKey = process.env.AIRTABLE_API ?? '';
    }
  }

  /**
   * Get Datas from AirTable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {SelectOptions} [options]
   * @return {*}  {Promise<T[]>}
   * @memberof DataService
   */
  async getDatas<T extends BaseModel>(
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    return await super.get<T>(baseId, tableName, options);
  }

  /**
   * Insert data to Airtable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {T} model
   * @return {*}  {Promise<AirtableRecord>}
   * @memberof DataService
   */
  async saveData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableRecord> {
    return await super.save<T>(baseId, tableName, model);
  }

  /**
   * Update data to AirTable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {T} model
   * @return {*}  {Promise<AirtableRecord>}
   * @memberof DataService
   */
  async updateData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableRecord> {
    return await super.update<T>(baseId, tableName, model);
  }

  /**
   * Delete data from AirTable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {T} model
   * @return {*}  {Promise<DeleteResponse>}
   * @memberof DataService
   */
  async deleteData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<DeleteResponse> {
    return await super.delete<T>(baseId, tableName, model);
  }
}
