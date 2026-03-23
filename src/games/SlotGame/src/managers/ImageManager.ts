import ImageStorage from "../storage/ImageStorage";

export default class ImageManager {
  static addImage(key: string, source: string | Blob) {
    ImageStorage.addImage(key, source);
  }

  static getImage(key: string): string | Blob | undefined {
    return ImageStorage.getImage(key);
  }
}