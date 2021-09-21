import { apiData } from './apiData.class';


export class apiResponse {
  result: string;
  response: string;
  data: Array<apiData> = [];
  limit: string;
  offset: string;
  total: string;

  constructor(result: string, response: string, data: Array<apiData>, limit: string, offset: string, total: string) {
    this.result = result;
    this.response = response;
    this.data = data;
    this.limit = limit;
    this.offset = offset;
    this.total = total;
  }
}


