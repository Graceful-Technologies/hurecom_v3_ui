import { RoleResponse } from '@/app/core/models/admin/role-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface Role {
  id: number;
  name: string;
  key: string;
  description: string;
  icon: string;
  color: string;
  permissions: string[];
  userCount: number;
  createdOn: string;
  active: boolean;
  isSystem: boolean;       // system roles cannot be deleted
}

@Component({
  selector: 'app-list-roles',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list-roles.html',
  styleUrl: './list-roles.scss',
})
export class ListRoles {
  private api = inject(ApiService);
  public gs = inject(GlobalService);

  roles = signal<RoleResponse[]>([]);

  ngOnInit(): void {
    this.searchRoles();
  }

  searchRoles() {
    const route = "/api/admin/roles";

    this.api.get<RoleResponse[]>(route).subscribe({
      next: response => {
        this.roles.set(response);
      },
      error: error => {
        this.roles.set([]);
      }
    });
  }
}
