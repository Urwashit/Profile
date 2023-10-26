import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserDb } from "../models/user";
import { ApiService } from "../services/api.service";
import { LocalStorageService } from "../services/local-storage.service";
import { SharedService } from "../services/shared.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  userdetail!: UserDb;
  subscription!: Subscription;
  userId: any;

  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.sharedService._userId.subscribe(
      (res) => {
        this.userId = res;
        this.getUser(this.userId);
      },
      (error) => {
        this.userId = this.localStorageService.getItem("userId");
      }
    );
  }

  getUser(userId: string) {
    this.apiService.getUser(userId).subscribe({
      next: (res) => {
        this.userdetail = res;
      },
      error: (error) => {},
    });
  }
}
