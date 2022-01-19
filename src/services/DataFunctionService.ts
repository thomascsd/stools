import { SelectOptions, AirtableRecord, DeleteResponse } from 'asyncairtable';
import { BaseModel } from '../models/BaseModel';
import { BaseService } from './BaseService';

/**
 * Defines  service that access AirTable's data
 *
 * @export
 * @class DataFunctionService
 * @extends {BaseService}
 */
export class DataFunctionService extends BaseService {
  constructor(public apiKey: string, public baseId: string) {
    super(apiKey);
  }

  async getDatas<T extends BaseModel>(tableName: string, options?: SelectOptions): Promise<T[]> {
    return await super.get<T>(this.baseId, tableName, options);
  }

  async saveData<T extends BaseModel>(tableName: string, model: T): Promise<AirtableRecord> {
    return await super.save<T>(this.baseId, tableName, model);
  }

  async updateData<T extends BaseModel>(tableName: string, model: T): Promise<AirtableRecord> {
    return await super.update<T>(this.baseId, tableName, model);
  }

  async deleteData<T extends BaseModel>(tableName: string, model: T): Promise<DeleteResponse> {
    return await super.delete<T>(this.baseId, tableName, model);
  }
}
