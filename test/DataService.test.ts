import { config } from 'dotenv';
import { BaseModel } from '@thomascsd/stools-models';
import { DataService } from '../src';
import { AirtableResult } from '../src/dtos';

config();

const token = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataService;
  let result: AirtableResult;

  beforeEach(() => {
    service = new DataService();
  });

  it('get datas', async () => {
    const datas = await service.getData(token, baseId, 'contact');

    expect(datas.length).not.toEqual(0);
  });

  it('add data', async () => {
    const model: BaseModel = {
      name: 'thomas',
      email: 't@sample.com',
      mobile: '0999123456',
    };

    result = await service.saveData(token, baseId, 'contact', model);

    expect(result).not.toBeUndefined();
    expect(result.records[0].fields.name).toEqual('thomas');

    console.dir(result);
  });

  it('update data', async () => {
    const model: BaseModel = {
      id: result.records[0].id,
      name: 'thomas123',
      email: 't@sample.com',
      mobile: '0999123456',
    };

    result = await service.updateData(token, baseId, 'contact', model);

    expect(result).not.toBeUndefined();
    expect(result.records[0].fields.name).toEqual('thomas123');

    console.dir(result);
  });

  it('delete data', async () => {
    const model: BaseModel = {
      id: result.records[0].id,
    };

    const res = await service.deleteData(token, baseId, 'contact', model);

    console.dir(res);

    expect(res).not.toBeUndefined();
    expect(res.id).toEqual(result.records[0].id);
    expect(res.deleted).toBeTruthy();
  });
});
