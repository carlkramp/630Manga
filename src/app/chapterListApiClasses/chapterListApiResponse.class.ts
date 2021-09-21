import { Volume } from './volume.class';


export class ChapterListApiResponse {
  result: string;
  volumes: any;

  constructor(result: string, volumes: Array<Volume>) {
    this.result = result;
    this.volumes = volumes
  }
}
