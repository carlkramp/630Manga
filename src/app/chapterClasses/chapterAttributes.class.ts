export class chapterAttributes {
  title: string;
  volume: string;
  chapter: string;
  translatedLanguage: string;
  data: Array<string>;
  dataSaver: Array<string>;
  uploader: string;
  version: number;
  groups: Array<string>;
  manga: string;

  constructor(title: string, volume: string, chapter: string, translatedLanguage: string, data: Array<string>, dataSaver: Array<string>, uploader: string, version: number, groups: Array<string>, manga: string) {
    this.title = title;
    this.volume = volume;
    this.chapter = chapter;
    this.translatedLanguage = translatedLanguage;
    this.data = data;
    this.dataSaver = dataSaver;
    this.uploader = uploader;
    this.version = version;
    this.groups = groups;
    this.manga = manga;
  }
}
