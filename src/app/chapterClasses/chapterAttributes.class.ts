export class chapterAttributes {
  title: string;
  volume: string;
  chapter: string;
  translatedLanguage: string;
  hash: string;
  data: Array<string>;
  dataSaver: Array<string>;
  uploader: string;
  externalUrl: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishAt: string;

  constructor(title: string, volume: string, chapter: string, translatedLanguage: string, hash: string, externalUrl: string | null, data: Array<string>, dataSaver: Array<string>, uploader: string, version: number, createdAt: string, updatedAt: string, publishAt: string) {
    this.title = title;
    this.volume = volume;
    this.chapter = chapter;
    this.translatedLanguage = translatedLanguage;
    this.hash = hash;
    this.data = data;
    this.dataSaver = dataSaver;
    this.uploader = uploader;
    this.externalUrl = externalUrl;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.publishAt = publishAt;
  }
}
