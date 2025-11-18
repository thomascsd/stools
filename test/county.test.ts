import { config } from 'dotenv';
import { describe, expect, it, beforeEach } from 'vitest';
import { BaseModel } from '../src/dtos/BaseModel';
import { DataService } from '../src';
import { AirtableDeletion, AirtableResult } from '../src/dtos';

config();

const token = process.env.AIRTABLE_API ?? '';
const baseId = 'appYytqUfVu81cjXn';

describe('DataService', () => {
  let service: DataService;
  let countyResult: BaseModel[] = [];

  beforeEach(() => {
    service = new DataService();
  });

  it('get county', async () => {
    countyResult = await service.getData(token, baseId, 'county');

    expect(countyResult).not.toBeUndefined();
    expect(countyResult.length).toBeGreaterThan(0);
  });

  it('get distinct with options', async () => {
    const distincts = await service.getData(token, baseId, 'distinct', {
      filterByFormula: `countyCode=${countyResult[0].countyCode}`,
    });

    expect(distincts).not.toBeUndefined();
    expect(distincts.length).toBeGreaterThan(0);
  });
});
