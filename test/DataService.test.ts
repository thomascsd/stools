import { config } from 'dotenv';
import { describe, expect, it, beforeEach } from 'vitest';
import { BaseModel } from '../src/dtos/BaseModel';
import { DataService } from '../src';
import { AirtableDeletion, AirtableResult } from '../src/dtos';

config();

const token = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataService;
  let result: AirtableResult;

  beforeEach(() => {
    service = new DataService();
  });

  it('get data', async () => {
    const data = await service.getData(token, baseId, 'contact');

    expect(data.length).not.toEqual(0);
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

    const updateResult = await service.updateData(token, baseId, 'contact', model);
    console.log('🚀 ~ it ~ updateResult:', updateResult);

    expect(updateResult).not.toBeUndefined();
    expect(updateResult.fields.name).toEqual('thomas123');

    console.dir(updateResult);
  });

  it('delete data', async () => {
    const model: BaseModel = {
      id: result.records[0].id,
    };

    const deleteResult: AirtableDeletion = await service.deleteData(
      token,
      baseId,
      'contact',
      model
    );
    console.log('🚀 ~ it ~ delete ~ res:', deleteResult);

    expect(deleteResult).not.toBeUndefined();
    expect(deleteResult.id).toEqual(model.id); // Updated to use model.id instead of result.records[0].id
    expect(deleteResult.deleted).toBeTruthy();
  });
});
