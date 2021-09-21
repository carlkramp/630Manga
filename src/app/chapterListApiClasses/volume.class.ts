import { Chapter } from './chapter.class';
import { noneVolume } from './noneVolume.class';

export class Volume {
  volume: string;
  count: number;
  chapters: Array<Chapter>
  none: noneVolume

  constructor(chapters: Array<Chapter>, count: number, volume: string, none: noneVolume) {
    this.chapters = chapters;
    this.count = count;
    this.volume = volume;
    this.none = none;
  }
}
