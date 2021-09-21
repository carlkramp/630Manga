import { Cover } from './cover.class';

export class coverData {
  result: string;
  response: string;
  data: Cover;

  constructor(result: string, response: string, data: Cover) {
    this.result = result;
    this.response = response;
    this.data = data;
  }
}
