import { loadEnv } from '../src/services/loadEnv';

loadEnv();

describe('load env', () => {
  it('test env', () => {
    expect('').toEqual('');
  });
});
