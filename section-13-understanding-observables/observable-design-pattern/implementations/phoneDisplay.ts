import type { Observer } from "../interfaces/observerInterface";

export class PhoneDisplay implements Observer {
  private weather: string;
  private name: string;

  constructor() {
    this.weather = "";
    this.name = "Phone Display";
  }

  update = (weather: string) => {
    this.weather = weather;
    this.display();
  };

  display() {
    console.log("Phone display weather updated: " + this.weather + "\n");
  }
}
