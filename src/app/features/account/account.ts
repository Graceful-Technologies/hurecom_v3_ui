import { AccountResponse } from '@/app/core/models/auth/account-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-account',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private toast = inject(ToastService);
  private dialogRef = inject(MatDialogRef<Account>);

  account = signal<AccountResponse | null>(null);
  loading = signal(true);
  passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount(): void {
    this.loading.set(true);
    this.api.get<AccountResponse>('/api/auth/me').subscribe({
      next: response => {
        this.account.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Unable to load account details.');
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.getRawValue();
    if (newPassword !== confirmPassword) {
      this.passwordForm.controls.confirmPassword.setErrors({ mismatch: true });
      return;
    }

    this.loader.show();
    this.api.post('/api/auth/change-password', { currentPassword, newPassword }).subscribe({
      next: () => {
        this.loader.hide();
        this.passwordForm.reset();
        this.toast.success('Password changed successfully.');
      },
      error: () => {
        this.loader.hide();
        this.toast.error('Unable to change password.');
      },
    });
  }
}
