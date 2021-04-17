import AsyncAirtable from 'asyncairtable';
import { AirtableRecord, SelectOptions } from 'asyncairtable/lib/@types';
import { Service, Inject, Token } from 'typedi';
import { BaseModel } from '../models/BaseModel';

const AIRTABLE_APIKEY_TOKEN = 'stools_AIRTABLE_APIKEY_TOKEN';
export const apiKeyToken = new Token<string>(AIRTABLE_APIKEY_TOKEN);

@Service()
export class DataService {
  constructor(@Inject(apiKeyToken) private apiKey: string) {
    if (!this.apiKey) {
      this.apiKey = process.env.AIRTABLE_API ?? '';
    }
  }

  async getDatas<T extends BaseModel>(
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
        const keys = Object.keys(fields);
        const obj: Record<string, unknown> = {};
        for (let key of keys) {
          const v = fields[key];
          obj[key] = v;
        }

        return obj;
      }) as T[];

    return body;
  }

  async saveData<T extends BaseModel>(baseId: string, tableName: string, model: T) {
    const airtable = this.getAirTableClient(baseId);
    const body = await airtable.createRecord(tableName, model);

    return body;
  }

  async updateData<T extends BaseModel>(baseId: string, tableName: string, model: T) {
    const airtable = this.getAirTableClient(baseId);
    const tmpModel = { ...model };
    const id = tmpModel.id;
    delete tmpModel.id;
    const body = await airtable.updateRecord(tableName, {
      id: id ?? '',
      fields: tmpModel,
    });

    return body;
  }

  async deleteData<T extends BaseModel>(baseId: string, tableName: string, model: T) {
    const airtable = this.getAirTableClient(baseId);

    const res = await airtable.deleteRecord(tableName, model.id as string);
    return res;
  }

  private getAirTableClient(baseId: string) {
    const airtable = new AsyncAirtable(this.apiKey, baseId);

    return airtable;
  }
}
