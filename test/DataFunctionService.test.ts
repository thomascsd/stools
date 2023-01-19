import { config } from 'dotenv';
import { BaseModel } from '@thomascsd/stools-models';
import { DataFunctionService } from '../src';
import { AirtableRecord } from 'asyncairtable/lib/@types';

config();

const apiKey = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataFunctionService;
  let data: AirtableRecord;

  beforeEach(() => {
    service = new DataFunctionService(apiKey, baseId);
  });

  it('apikey by env', () => {
    expect(service.apiKey).toEqual(apiKey);
  });

  it('baseId by env', () => {
    expect(service.baseId).toEqual(baseId);
  });

  it('get datas', async () => {
    const datas = await service.getDatas('contact');

    expect(datas.length).not.toEqual(0);
  });

  it('add data', async () => {
    const model: BaseModel = {
      name: 'thomas',
      email: 't123@sample.com',
      mobile: '0999123456',
    };

    data = await service.saveData('contact', model);

    expect(data).not.toBeUndefined();
    expect(data.fields.name).toEqual('thomas');

    console.dir(data);
  });

  it('update data', async () => {
    const model: BaseModel = {
      id: data.id,
      name: 'thomas789',
      email: 't123@sample.com',
      mobile: '0999123456',
    };

    data = await service.updateData('contact', model);

    expect(data).not.toBeUndefined();
    expect(data.fields.name).toEqual('thomas789');

    console.dir(data);
  });

  it('delete data', async () => {
    const model: BaseModel = {
      id: data.id,
    };

    const res = await service.deleteData('contact', model);

    console.dir(res);

    expect(res).not.toBeUndefined();
    expect(res.id).toEqual(data.id);
    expect(res.deleted).toBeTruthy();
  });
});
