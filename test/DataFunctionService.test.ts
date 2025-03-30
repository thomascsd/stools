import { config } from 'dotenv';
import { BaseModel } from '@thomascsd/stools-models';
import { DataFunctionService } from '../src';
import { AirtableResult } from '../src/dtos/AirtableResult';

config();

const token = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataFunctionService;
  let result: AirtableResult;

  beforeEach(() => {
    service = new DataFunctionService(token, baseId);
  });

  it('apikey by env', () => {
    expect(service.token).toEqual(token);
  });

  it('baseId by env', () => {
    expect(service.baseId).toEqual(baseId);
  });

  it('get data', async () => {
    const data = await service.getData('contact');

    expect(data.length).not.toEqual(0);
  });

  it('add data', async () => {
    const model: BaseModel = {
      name: 'thomas',
      email: 't123@sample.com',
      mobile: '0999123456',
    };

    result = await service.saveData('contact', model);

    expect(result).not.toBeUndefined();
    expect(result.records[0].fields.name).toEqual('thomas');

    console.dir(result);
  });

  it('update data', async () => {
    const model: BaseModel = {
      id: result.records[0].id,
      name: 'thomas789',
      email: 't123@sample.com',
      mobile: '0999123456',
    };

    result = await service.updateData('contact', model);

    expect(result).not.toBeUndefined();
    expect(result.records[0].fields.name).toEqual('thomas789');

    console.dir(result);
  });

  it('delete data', async () => {
    const model: BaseModel = {
      id: result.records[0].id,
    };

    const res = await service.deleteData('contact', model);

    console.dir(res);

    expect(res).not.toBeUndefined();
    expect(res.id).toEqual(result.records[0].id);
    expect(res.deleted).toBeTruthy();
  });
});
