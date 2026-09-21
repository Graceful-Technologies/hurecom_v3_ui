import { AuthService } from '@/app/core/services/auth-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  errorMessage = signal<string | null>(null);
  loading = signal(false);

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loading.set(true);
      this.auth.login(credentials).subscribe({
        next: response => {
          this.auth.setToken(response.token);
          this.loading.set(false);
          this.router.navigateByUrl("/dashboard");
        },
        error: error => {
          this.loading.set(false);
          this.errorMessage.set("Invalid username or password");
        }
      });
    }
  }

}
