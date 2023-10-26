import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private subject = new Subject();
  private userId: BehaviorSubject<string> = new BehaviorSubject("");
  _userId = this.userId.asObservable();

  constructor() {}

  setValue(value: boolean) {
    this.subject.next(value);
  }

  getValue(): Observable<any> {
    return this.subject.asObservable();
  }

  setuser(value: string) {
    this.userId.next(value);
  }

  getuser(): Observable<any> {
    return this.userId.asObservable();
  }
}
