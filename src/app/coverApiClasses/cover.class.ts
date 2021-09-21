import { coverAttributes } from './coverAttributes.class';
import { coverRelationships } from './coverRelationships.class';

export class Cover {
  id: string;
  type: string;
  attributes: coverAttributes;
  relationships: Array<coverRelationships>

  constructor(id: string, type: string, attributes: coverAttributes, relationships: Array<coverRelationships>) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
    this.relationships = relationships;
  }
}
