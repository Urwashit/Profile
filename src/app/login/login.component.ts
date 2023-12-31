import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FloatLabelType } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { LocalStorageService } from "../services/local-storage.service";
import { SharedService } from "../services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signupform!: FormGroup;
  form!: FormGroup;
  hide = true;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto" as FloatLabelType);

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private router: Router,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm() {
    this.form = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });

    this.signupform = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(10)]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      phoneNo: [
        null,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      address: [null, [Validators.required]],
    });
  }

  signup(form: any) {
    if (this.signupform.valid) {
      let signupModel = Object.assign({}, this.signupform.value);
      this.apiService.signup(signupModel).subscribe(
        (res: any) => {
          this.localStorageService.saveItem("userId", res.user._id);
          this.sharedService.setuser(res.user._id);
          this.localStorageService.saveItem("token", res.accessToken);
          this.apiService.onRefresh();
          this.sharedService.setValue(true);
          this.router.navigate(["/profile"]);
        },
        (error: any) => {
          this.openSnackBar(error.error.error, "Refresh");
          this.form.reset();
        }
      );
    }
  }

  login(form: any) {
    let isSessionActive = this.localStorageService.getItem("token");
    if (
      isSessionActive === "0" ||
      isSessionActive === undefined ||
      !(isSessionActive === "1")
    ) {
      if (this.form.valid) {
        let loginModel = Object.assign({}, this.form.value);
        this.apiService.login(loginModel).subscribe({
          next: (res: any) => {
            this.localStorageService.saveItem("token", res.accessToken);
            this.localStorageService.saveItem("userId", res.user._id);
            this.sharedService.setuser(res.user._id);
            this.sharedService.setValue(true);
            // this.apiService.onRefresh();
            this.router.navigate(["/profile"]);
          },
          error: (error: any) => {
            this.openSnackBar(error.error.error, "Refresh");
            this.form.reset();
          },
        });
      }
    }
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action);

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
