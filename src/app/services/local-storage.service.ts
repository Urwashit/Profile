import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  getItem(item: string) {
    return localStorage.getItem(item);
  }

  clear() {
    localStorage.clear();
  }

  saveItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
