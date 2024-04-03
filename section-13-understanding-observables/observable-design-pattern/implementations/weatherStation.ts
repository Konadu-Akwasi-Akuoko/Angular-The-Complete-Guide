import type { Observer } from "../interfaces/observerInterface";
import type { Subject } from "../interfaces/subjectInterface";

export class WeatherStation implements Subject {
  private observers: Observer[];
  private weather: string;

  constructor() {
    this.observers = [];
    this.weather = "";
  }

  addObserver = (observer: Observer) => {
    this.observers.push(observer);
    console.log("Observer added:" + JSON.stringify(observer, null, 2) + "\n");
  };

  removeObserver = (observer: Observer) => {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log("Observer removed:" + JSON.stringify(observer, null, 2) + "\n");
  };

  listObservers() {
    console.log("Observers: \n" + JSON.stringify(this.observers, null, 2));
  }

  notifyObservers = () => {
    this.observers.forEach((observer) => {
      observer.update(this.weather);
    });
  };

  setWeather(weather: string) {
    this.weather = weather;
    this.notifyObservers();
  }
}
