import { BaseModel } from '@thomascsd/stools-models';
import { HttpService } from './HttpService.js';
import { AirtableDeleteMapping, AirtableRecord, SelectOptions } from '../dtos/index.js';

/**
 * Base class that accesses Airtable API
 *
 * @export
 * @class BaseService
 */
export class BaseService {
  /**
   * Creates an instance of BaseService.
   */
  constructor() {}

  /**
   * Retrieves records from a specified Airtable base and table.
   *
   * @template T
   * @param {string} baseId - The ID of the Airtable base.
   * @param {string} tableName - The name of the table.
   * @param {SelectOptions} [options] - Optional query parameters.
   * @returns {Promise<T[]>} - A promise that resolves to an array of records.
   */
  protected async get<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    const airtable = this.getAirTableClient(token, baseId);
    const mapping = await airtable.list(tableName);
    const records = mapping.records;

    const body = records
      .map((o: AirtableRecord) => {
        const fields = o.fields;
        fields.id = o.id;
        return fields;
      })
      .map(fields => {
        const obj: Record<string, unknown> = { ...fields };
        return obj;
      }) as T[];

    return body;
  }

  protected async save<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ) {
    const airtable = this.getAirTableClient(token, baseId);
    const body = await airtable.create(tableName, model);
    return body;
  }

  async update<T extends BaseModel>(token: string, baseId: string, tableName: string, model: T) {
    const airtable = this.getAirTableClient(token, baseId);
    const tmpModel = { ...model };
    const id = tmpModel.id;
    delete tmpModel.id;
    const body = await airtable.update(tableName, model.id as string, {
      id: id as string,
      fields: tmpModel,
    });

    return body;
  }

  protected async delete<T extends BaseModel>(
    token: string,
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableDeleteMapping> {
    const airtable = this.getAirTableClient(token, baseId);

    const res = await airtable.delete(tableName, model.id as string);
    return res;
  }

  private getAirTableClient(token: string, baseId: string) {
    const airtable = new HttpService(token, baseId);

    return airtable;
  }
}
