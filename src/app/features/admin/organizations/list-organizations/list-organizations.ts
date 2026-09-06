import { OrganizationResponse } from '@/app/core/models/admin/organization-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-list-organizations',
  imports: [
    CommonModule, FormsModule, TableModule, SelectModule, ButtonModule, InputTextModule,
    IconFieldModule, InputIconModule, TooltipModule, SkeletonModule
  ],
  templateUrl: './list-organizations.html',
  styleUrl: './list-organizations.scss',
})
export class ListOrganizations {
  private api = inject(ApiService);
  public global = inject(GlobalService);

  organizations = signal<OrganizationResponse[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    const route = "/api/admin/organizations";

    this.api.get<OrganizationResponse[]>(route).subscribe({
      next: response => {
        this.organizations.set(response);
      },
      error: error => {
        this.organizations.set([]);
      }
    });
  }

  openAddOrganization(): void {

  }

  editOrganization(organization: OrganizationResponse): void {

  }

  deleteOrganization(org: OrganizationResponse): void {
    console.log('Delete:', org.name);
  }
}
