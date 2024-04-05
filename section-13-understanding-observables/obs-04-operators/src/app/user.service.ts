import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isActivated: boolean;
  isActivated$: Subject<boolean>;

  constructor() {
    this.isActivated$ = new Subject<boolean>();
    this.isActivated = false;
    this.isActivated$.next(this.isActivated);
  }

  onActivateChanged() {
    this.isActivated = !this.isActivated;
    console.log(this.isActivated);
    this.isActivated$.next(this.isActivated);
  }
}
