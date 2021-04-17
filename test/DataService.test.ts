import { config } from 'dotenv';
import { DataService, BaseModel } from '../src';
import { AirtableRecord } from 'asyncairtable/lib/@types';

config();

const apiKey = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataService;
  let data: AirtableRecord;

  beforeEach(() => {
    service = new DataService(apiKey);
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
