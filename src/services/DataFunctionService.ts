import { BaseModel } from '@thomascsd/stools-models';
import { BaseService } from './BaseService.js';
import { AirtableCreateMapping, AirtableDeleteMapping, SelectOptions } from '../dtos/index.js';

/**
 * Defines  service that access AirTable's data
 *
 * @export
 * @class DataFunctionService
 * @extends {BaseService}
 */
export class DataFunctionService extends BaseService {
  constructor(public token: string, public baseId: string) {
    super();
  }

  async getDatas<T extends BaseModel>(tableName: string, options?: SelectOptions): Promise<T[]> {
    return await super.get<T>(this.token, this.baseId, tableName, options);
  }

  async saveData<T extends BaseModel>(tableName: string, model: T): Promise<AirtableCreateMapping> {
    return await super.save<T>(this.token, this.baseId, tableName, model);
  }

  async updateData<T extends BaseModel>(
    tableName: string,
    model: T
  ): Promise<AirtableCreateMapping> {
    return await super.update<T>(this.token, this.baseId, tableName, model);
  }

  async deleteData<T extends BaseModel>(
    tableName: string,
    model: T
  ): Promise<AirtableDeleteMapping> {
    return await super.delete<T>(this.token, this.baseId, tableName, model);
  }
}
