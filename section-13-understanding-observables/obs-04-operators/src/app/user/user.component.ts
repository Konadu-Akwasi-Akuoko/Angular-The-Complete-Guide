import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.id = 0;
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.id = +params.id;
      },
      complete: () => {
        console.log("completed");
      },
      error: () => {
        console.log("error");
      },
    });
  }

  onButtonClick = () => {
    this.userService.onActivateChanged();
  };
}
