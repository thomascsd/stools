import { loadEnv } from '../src/services/loadEnv';

loadEnv();

describe('load env', () => {
  it('test env', () => {
    expect(process.env.TEST_VALUE).toEqual('12345');
  });
});
