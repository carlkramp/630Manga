export class coverRelationships {
  id: string;
  type: string;
  attributes: any;

  constructor(id: string, type: string, attributes: any) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
  }
}
