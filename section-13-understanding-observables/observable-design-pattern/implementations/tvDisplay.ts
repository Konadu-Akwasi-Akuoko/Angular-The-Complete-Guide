import type { Observer } from "../interfaces/observerInterface";

export class TvDisplay implements Observer {
  private weather: string;
  private name: string;

  constructor() {
    this.weather = "";
    this.name = "TV Display";
  }

  update = (weather: string) => {
    this.weather = weather;
    this.display();
  };

  display() {
    console.log("TV display weather updated: " + this.weather + "\n");
  }
}
