import { config } from 'dotenv';

/**
 *Load env file that uses dotent.
 *
 * @export
 * @param {string} [path='./env'] Indicates relative path to env file.
 */
export function loadEnv(path: string = './env') {
  config({ path: path });
}
