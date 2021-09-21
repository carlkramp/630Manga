import { Chapter } from './chapter.class';

export class noneVolume {
  volume: string;
  count: number;
  chapters: Array<Chapter>

  constructor(chapters: Array<Chapter>, count: number, volume: string) {
    this.chapters = chapters;
    this.count = count;
    this.volume = volume;
  }
}
