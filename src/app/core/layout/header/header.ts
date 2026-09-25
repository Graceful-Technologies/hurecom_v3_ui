import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { signal } from '@angular/core';
import { AccountResponse } from '../../models/auth/account-response';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { Account } from '../../../features/account/account';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private api = inject(ApiService);

  account = signal<AccountResponse | null>(null);

  ngOnInit(): void {
    this.api.get<AccountResponse>('/api/auth/me').subscribe({
      next: response => this.account.set(response),
    });
  }

  get initials(): string {
    return (this.account()?.username || 'U').charAt(0).toUpperCase();
  }

  openAccount(): void {
    this.dialog.open(Account, {
      width: '100%',
      maxWidth: '100vw',
      position: { top: '56px' },
      panelClass: 'account-drawer-panel',
      autoFocus: false,
    });
  }

  openChangePassword(): void {
    this.openAccount();
  }

  openEmailConfiguration(): void {
    // The email configuration route will be added when its API is available.
  }

  openControlPanel(): void {
    // The control panel route will be added when its feature is available.
  }

  logout(): void {
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (!confirmed) {
      return;
    }

    this.auth.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => this.router.navigateByUrl('/login')
    });
  }
}
