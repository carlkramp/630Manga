import { apiAttributes } from './apiAttributes.class';
import { apiRelationships } from './apiRelationships.class';

export class apiData {
  attributes: apiAttributes;
  id: string;
  relationships: Array<apiRelationships>;
  type: string;

  constructor(attributes: apiAttributes, id: string, relationships: Array<apiRelationships>, type: string) {
    this.attributes = attributes;
    this.id = id;
    this.relationships = relationships;
    this.type = type;

  }
}
