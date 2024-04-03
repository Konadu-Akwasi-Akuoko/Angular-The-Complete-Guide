import type { Observer } from "./observerInterface";

export interface Subject {
  addObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: () => void;
}
