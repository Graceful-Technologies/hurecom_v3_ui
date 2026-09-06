import { RoleResponse } from '@/app/core/models/admin/role-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

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
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
  ],
  templateUrl: './list-roles.html',
  styleUrl: './list-roles.scss',
})
export class ListRoles {
  private api = inject(ApiService);
  public gs = inject(GlobalService);
  private dialog = inject(DialogService);

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
