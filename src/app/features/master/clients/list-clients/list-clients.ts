import { Paginator } from '@/app/core/components/paginator/paginator';
import { PageResponse } from '@/app/core/models/common/page-response';
import { ClientListResponse } from '@/app/core/models/master/clients/client-list-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AddEditClient } from '../add-edit-client/add-edit-client';

@Component({
  selector: 'app-list-clients',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Paginator
],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.scss',
})
export class ListClients {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  clients = signal<ClientListResponse[]>([]);
  currentPage = signal(0);
  totalRecords = signal(0);
  rowsPerPage = signal(10);

  ngOnInit(): void {
    this.searchClients();
  }

  searchClients() {
    const route = "/api/master/clients/search";
    const payload = {
      page: this.currentPage() + 1,
      limit: this.rowsPerPage(),
    };
    this.api.search<PageResponse<ClientListResponse>>(route, payload).subscribe({
      next: response => {
        this.clients.set(response.content);
        this.totalRecords.set(response.totalElements);
      },
      error: error => {
        this.clients.set([]);
      }
    });
  }


  openAddClientDialog(): void {
    const ref = this.dialog.open(AddEditClient, {
      width: '450px',
      disableClose: true,
      data: null,
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.searchClients();
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.rowsPerPage.set(event.rows);
    this.searchClients();
  }

}
