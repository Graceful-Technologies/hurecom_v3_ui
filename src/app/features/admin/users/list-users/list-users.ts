import { Paginator } from '@/app/core/components/paginator/paginator';
import { UserResponse } from '@/app/core/models/admin/user-response';
import { PageResponse } from '@/app/core/models/common/page-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddEditUser } from '../add-edit-user/add-edit-user';

@Component({
  selector: 'app-list-users',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    Paginator,
  ],
  templateUrl: './list-users.html',
  styleUrl: './list-users.scss',
})
export class ListUsers {
  private api = inject(ApiService);
  public gs = inject(GlobalService);
  private dialog = inject(MatDialog);

  users = signal<UserResponse[]>([]);
  currentPage = signal(0);
  totalRecords = signal(0);
  rowsPerPage = signal(10);

  options = this.gs.getPageLimits();

  ngOnInit(): void {
    this.searchUsers();
  }

  searchUsers() {
    const route = "/api/admin/users/search";
    const payload = {
      page: this.currentPage() + 1,
      limit: this.rowsPerPage(),
    };

    this.api.search<PageResponse<UserResponse>>(route, payload).subscribe({
      next: response => {
        this.users.set(response.content);
        this.totalRecords.set(response.totalElements);
      },
      error: error => {
        this.users.set([]);
      }
    });
  }

  openAddUser(): void {
    const ref = this.dialog.open(AddEditUser, {
      width: '450px',
      disableClose: true,
      data: null
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.searchUsers();
      }
    });
  }

  openEditUser(user: UserResponse) {
    const ref = this.dialog.open(AddEditUser, {
      width: '450px',
      disableClose: true,
      data: { user },
    });

    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.searchUsers();
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.rowsPerPage.set(event.rows);
    this.searchUsers();
  }

}
