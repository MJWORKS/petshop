import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { CustomValidator } from '../../../validators/custom.validator';
import { Security } from '../../../utils/secury.util';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getToken();
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
    });
  }

  getToken(): void {
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe({
        next: (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token)
        },
        error: (err) => {
          localStorage.clear();
          this.busy = false;
        },
      });
    } else {
    }
  }

  submit(): void {
    this.busy = true;
    this.service.authenticate(this.loginForm.value).subscribe({
      next: (data) => {
        this.busy = false;
        this.setUser(data.customer, data.token)
      },
      error: (err) => {
        console.log(err);
        this.busy = false;
      },
    });
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }
}
