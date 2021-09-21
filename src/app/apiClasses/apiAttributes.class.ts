import { apiDescription } from './apiDescription.class';
import { apiLinks } from './apiLinks.class';
import { apiTags } from './apiTags.class';
import { apiTitles } from './apiTitles.class';

export class apiAttributes {
  altTitles: Array<Object> = [];
  contentRating: string;
  createdAt: string;
  description: apiDescription;
  lastChapter: string;
  lastVolume: string;
  links: apiLinks;
  originalLanguage: string;
  publicationDemographic: string;
  status: string;
  tags: Array<apiTags> = [];
  title: apiTitles;
  updatedAt: string;
  version: string;
  year: string;

  constructor(altTitles: Array<Object>, contentRating: string, createdAt: string, description: apiDescription, lastChapter: string,
    lastVolume: string, links: apiLinks, originalLanguage: string, publicationDemographic: string, status: string, tags: Array<apiTags>, title: apiTitles, updatedAt: string,
    version: string, year: string) {
    this.altTitles = altTitles;
    this.contentRating = contentRating;
    this.createdAt = createdAt;
    this.description = description;
    this.lastChapter = lastChapter;
    this.lastVolume = lastVolume;
    this.links = links;
    this.originalLanguage = originalLanguage;
    this.publicationDemographic = publicationDemographic;
    this.status = status;
    this.tags = tags;
    this.title = title;
    this.updatedAt = updatedAt;
    this.version = version;
    this.year = year;
  }
}
