import AsyncAirtable from 'asyncairtable';
import { AirtableRecord, SelectOptions, DeleteResponse } from 'asyncairtable';
import { BaseModel } from '../models/BaseModel';

/**
 * Base class that access AitTable api
 *
 * @export
 * @class BaseService
 */
export class BaseService {
  constructor(public apiKey: string) {}

  protected async get<T extends BaseModel>(
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    const airtable = this.getAirTableClient(baseId);
    const records: AirtableRecord[] = await airtable.select(tableName, options);

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

  protected async save<T extends BaseModel>(baseId: string, tableName: string, model: T) {
    const airtable = this.getAirTableClient(baseId);
    const body = await airtable.createRecord(tableName, model);
    return body;
  }

  async update<T extends BaseModel>(baseId: string, tableName: string, model: T) {
    const airtable = this.getAirTableClient(baseId);
    const tmpModel = { ...model };
    const id = tmpModel.id;
    delete tmpModel.id;
    const body = await airtable.updateRecord(tableName, {
      id: id as string,
      fields: tmpModel,
    });

    return body;
  }

  protected async delete<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<DeleteResponse> {
    const airtable = this.getAirTableClient(baseId);

    const res = await airtable.deleteRecord(tableName, model.id as string);
    return res;
  }

  private getAirTableClient(baseId: string) {
    const airtable = new AsyncAirtable(this.apiKey, baseId);

    return airtable;
  }
}
