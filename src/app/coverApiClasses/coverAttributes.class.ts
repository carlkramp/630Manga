export class coverAttributes {
  volume: string | null;
  fileName: string;
  description: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;

  constructor(volume: string | null, fileName: string, description: string | null, version: number, createdAt: string, updatedAt: string) {
    this.volume = volume;
    this.fileName = fileName;
    this.description = description;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}
