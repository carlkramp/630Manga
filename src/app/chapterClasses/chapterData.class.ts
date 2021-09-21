import { chapterAttributes } from './chapterAttributes.class';
import { chapterRelationships } from './chapterRelationships.class';

export class chapterData {
  id: string;
  type: string;
  attributes: chapterAttributes;
  relationships: chapterRelationships;

  constructor(id: string, type: string, attributes: chapterAttributes, relationships: chapterRelationships) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
    this.relationships = relationships;
  }
}
