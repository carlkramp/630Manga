export class Manga {
  title: string;
  id: string;
  coverArtId?: string

  constructor(title: string, id: string, coverArtId: string) {
    this.title = title;
    this.id = id;
    this.coverArtId = coverArtId;
  }
}
