import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserDb } from "../models/user";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  userdetail!: UserDb;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getUser("6538a188247ebf0cba9e507f").subscribe({
      next: (res) => {
        console.log(res);
        this.userdetail = res;
      },
      error: (error) => {
        console.log(error);
        if (error.status === 410) {
          this.apiService.logout();
          this.router.navigate(["/login"]);
        }
      },
    });
  }
}
