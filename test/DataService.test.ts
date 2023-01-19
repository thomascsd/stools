import { config } from 'dotenv';
import { BaseModel } from '@thomascsd/stools-models';
import { AirtableRecord } from 'asyncairtable/lib/@types';
import { Container } from 'typedi';
import { DataService, API_KEY_TOKEN } from '../src';

config();

const apiKey = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataService;
  let data: AirtableRecord;

  beforeEach(() => {
    service = new DataService(apiKey);
  });

  it('apikey by env', () => {
    expect(service.apiKey).toEqual(apiKey);
  });

  it('apiKey by token', () => {
    Container.set(API_KEY_TOKEN, apiKey);

    service = new DataService(Container.get(API_KEY_TOKEN));
    expect(service.apiKey).toEqual(apiKey);
  });

  it('get datas', async () => {
    const datas = await service.getDatas(baseId, 'contact');

    expect(datas.length).not.toEqual(0);
  });

  it('add data', async () => {
    const model: BaseModel = {
      name: 'thomas',
      email: 't@sample.com',
      mobile: '0999123456',
    };

    data = await service.saveData(baseId, 'contact', model);

    expect(data).not.toBeUndefined();
    expect(data.fields.name).toEqual('thomas');

    console.dir(data);
  });

  it('update data', async () => {
    const model: BaseModel = {
      id: data.id,
      name: 'thomas123',
      email: 't@sample.com',
      mobile: '0999123456',
    };

    data = await service.updateData(baseId, 'contact', model);

    expect(data).not.toBeUndefined();
    expect(data.fields.name).toEqual('thomas123');

    console.dir(data);
  });

  it('delete data', async () => {
    const model: BaseModel = {
      id: data.id,
    };

    const res = await service.deleteData(baseId, 'contact', model);

    console.dir(res);

    expect(res).not.toBeUndefined();
    expect(res.id).toEqual(data.id);
    expect(res.deleted).toBeTruthy();
  });
});
