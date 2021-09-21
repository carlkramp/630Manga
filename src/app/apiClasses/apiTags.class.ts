import { apiTagsAttributes } from './apiTagsAttributes.class';

export class apiTags {
  attributes: apiTagsAttributes;
  id: string;
  type: string;

  constructor(attributes: apiTagsAttributes, id: string, type: string) {
    this.attributes = attributes
    this.id = id
    this.type = type
  }
}
