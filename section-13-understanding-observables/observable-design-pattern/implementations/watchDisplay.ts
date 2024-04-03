import type { Observer } from "../interfaces/observerInterface";

export class WatchDisplay implements Observer {
  private weather: string;
  private name: string;

  constructor() {
    this.weather = "";
    this.name = "Watch Display";
  }

  update = (weather: string) => {
    this.weather = weather;
    this.display();
  };

  display() {
    console.log("Watch display weather updated: " + this.weather + "\n");
  }
}
