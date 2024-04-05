import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  public isActivated: boolean;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.isActivated$.subscribe({
      next: (data) => {
        this.isActivated = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("completed");
      },
    });
  }

  ngOnDestroy(): void {
    this.userService.isActivated$.unsubscribe();
  }
}
