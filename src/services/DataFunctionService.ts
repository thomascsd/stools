import { BaseService } from './BaseService';

export class DataFunctionService extends BaseService {
  constructor(public apiKey: string) {
    super(apiKey);
  }
}
