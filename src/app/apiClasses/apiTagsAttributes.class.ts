export class apiTagsAttributes {
  description: Array<Object>[];
  group: string;
  name: string;
  version: string;

  constructor(description: Array<Object>[], group: string, name: string, version: string) {
    this.description = description;
    this.group = group;
    this.name = name;
    this.version = version;
  }
}
