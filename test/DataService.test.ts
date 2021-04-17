import { DataService } from '../src';

const apiKey = process.env.AIRTABLE_API ?? '';
const baseId = process.env.AIRTABLE_BASE_ID ?? '';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    service = new DataService(apiKey);
  });

  it('get datas', async () => {
    const datas = await service.getDatas(baseId, 'contacts');

    expect(datas.length).not.toEqual(0);
  });
});
