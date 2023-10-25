import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoginModel } from "../models/loginModel";
import { LoginResponse, User, UserDb } from "../models/user";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl = "http://localhost:3000/";
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.localStorageService.getItem("token")}`,
  });

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  login(req: LoginModel): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiUrl + `user/login`, req);
  }

  signup(req: User): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      this.apiUrl + `user/signup`,
      req
    );
  }

  getUser(id: string): Observable<UserDb> {
    return this.httpClient.get<UserDb>(this.apiUrl + `user/${id}`, {
      headers: this.headers,
    });
  }

  logout() {
    this.localStorageService.clear();
  }

  isAuthenticated() {
    if (this.localStorageService.getItem("token")) return true;
    else return false;
  }

  async onRefresh() {
    const currentUrl = this.router.url + "?";
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }
}
