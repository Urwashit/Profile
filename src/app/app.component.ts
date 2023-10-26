import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "./services/api.service";
import { SharedService } from "./services/shared.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Profile";
  isAuthenticated: boolean = false;
  subscription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.subscription = this.sharedService.getValue().subscribe({
      next: (res) => {
        this.isAuthenticated = res;
      },
    });
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
