import * as PIXI from "pixi.js";
import ImageManager from "../../../managers/ImageManager";
import ISpriteConfig from "./interface/ISpriteConfig";

export default class Sprite extends PIXI.Sprite {
  constructor(config: ISpriteConfig) {
    const {
      textureKey,
      x = 0,
      y = 0,
      anchorX = 0.5,
      anchorY = 0.5,
      visible = true,
      scaleX = 1,
      scaleY = 1,
      angle = 0,
      tint = 0xFFFFFF,
      isStatic = true,
      interactive = false,
      eventMode = "none",
    } = config;

    const imageData = ImageManager.getImage(textureKey);
    let spriteTexture: PIXI.Texture;

    if (typeof imageData === "string") {
      spriteTexture = PIXI.Texture.from(imageData);
    } else if (imageData instanceof Blob) {
      const url = URL.createObjectURL(imageData);
      spriteTexture = PIXI.Texture.from(url);
    } else {
      throw new Error(`Texture with key "${textureKey}" not found or invalid.`);
    }

    super(spriteTexture);
    this.anchor.set(anchorX, anchorY);
    this.position.set(x, y);
    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.angle = angle;
    this.tint = tint;
    this.visible = visible;
    this.interactiveChildren = interactive;
    this.cacheAsBitmap = isStatic;
  }

  public changeTexture(newTexture: string) {
    const imageData = ImageManager.getImage(newTexture);
    let updatedTexture: PIXI.Texture;

    if (typeof imageData === "string") {
      updatedTexture = PIXI.Texture.from(imageData);
    } else if (imageData instanceof Blob) {
      const url = URL.createObjectURL(imageData);
      updatedTexture = PIXI.Texture.from(url);
    } else {
      console.error(`Image with key "${newTexture}" not found.`);
      return;
    }

    this.texture = updatedTexture;
  }

  public setVisible(value: boolean) {
    this.visible = value;
  }
}