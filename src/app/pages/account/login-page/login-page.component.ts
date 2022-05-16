import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public busy = false;

  constructor(private service: DataService, private fb: FormBuilder) {}

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
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe({
        next: (data: any) => {
          localStorage.setItem('petshop.token', data.token);
          this.busy = false;
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
        localStorage.setItem('petshop.token', data.token);
        this.busy = false;
      },
      error: (err) => {
        console.log(err);
        this.busy = false;
      },
    });
  }
}
