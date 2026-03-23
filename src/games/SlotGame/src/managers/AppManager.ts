import { Application, Container, TickerCallback } from "pixi.js";
import AppStorage from "../storage/AppStorage";

export default class AppManager {
  static get app(): Application {
    if (!AppStorage.app) {
      throw new Error("AppStorage.app is not initialized");
    }
    return AppStorage.app;
  }

  static addChild(instance: Container): void {
    this.app.stage.addChild(instance);
  }

  static removeChild(instance: Container): void {
    this.app.stage.removeChild(instance);
  }

  static addToTicker(updateFunction: TickerCallback<any>): void {
    this.app.ticker.add(updateFunction);
  }
}