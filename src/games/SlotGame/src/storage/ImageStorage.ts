export default class ImageStorage {
  static images = new Map();

  static addImage(key:any, source:any) {
    this.images.set(key, source);
  }

  static getImage(key:any) {
    return this.images.get(key);
  }
}
