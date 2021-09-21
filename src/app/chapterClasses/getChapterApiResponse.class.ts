import { chapterData } from './chapterData.class';

export class getChapterApiResponse {
  result: string;
  data: chapterData;

  constructor(result: string, data: chapterData) {
    this.result = result;
    this.data = data;
  }
}

