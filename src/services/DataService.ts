import { AirtableRecord, DeleteResponse, SelectOptions } from 'asyncairtable/lib/@types';
import { Service, Inject, Token } from 'typedi';
import { BaseModel } from '../models/BaseModel';
import { BaseService } from './BaseService';

const AIRTABLE_APIKEY_TOKEN = 'stools_AIRTABLE_APIKEY_TOKEN';
export const API_KEY_TOKEN = new Token<string>(AIRTABLE_APIKEY_TOKEN);

/**
 * Define  service that access AirTable's data, and use DI with typedi.
 */
@Service()
export class DataService extends BaseService {
  constructor(@Inject(API_KEY_TOKEN) public apiKey: string) {
    super(apiKey);

    if (!this.apiKey) {
      this.apiKey = process.env.AIRTABLE_API ?? '';
    }
  }

  async getDatas<T extends BaseModel>(
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    return await super.get<T>(baseId, tableName, options);
  }

  async saveData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableRecord> {
    return await super.save<T>(baseId, tableName, model);
  }

  async updateData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableRecord> {
    return await super.update<T>(baseId, tableName, model);
  }

  async deleteData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<DeleteResponse> {
    return await super.delete<T>(baseId, tableName, model);
  }
}
