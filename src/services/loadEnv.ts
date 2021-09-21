import { config } from 'dotenv';

export function loadEnv(path: string = './env') {
  config({ path: path });
}
