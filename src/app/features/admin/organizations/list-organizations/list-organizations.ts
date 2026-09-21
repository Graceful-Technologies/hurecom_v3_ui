import { OrganizationResponse } from '@/app/core/models/admin/organization-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddEditOrganization } from '../add-edit-organization/add-edit-organization';

@Component({
  selector: 'app-list-organizations',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './list-organizations.html',
  styleUrl: './list-organizations.scss',
})
export class ListOrganizations {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

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
    this.openOrganizationDialog(null);
  }

  editOrganization(organization: OrganizationResponse): void {
    this.openOrganizationDialog(organization);
  }

  private openOrganizationDialog(organization: OrganizationResponse | null): void {
    const ref = this.dialog.open(AddEditOrganization, {
      width: '450px',
      disableClose: true,
      data: organization ? { organization } : null
    });

    ref.afterClosed().subscribe(response => {
      if (response) {
        this.getOrganizations();
      }
    });
  }

  deleteOrganization(org: OrganizationResponse): void {
    console.log('Delete:', org.name);
  }
}
