import { ClientLocationResponse } from '@/app/core/models/master/clients/client-location-response';
import { ClientResponse } from '@/app/core/models/master/clients/client-response';
import { ClientSpocResponse } from '@/app/core/models/master/clients/client-spoc-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { AddEditClientSpoc } from '../add-edit-client-spoc/add-edit-client-spoc';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-client-spocs',
  imports: [CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './list-client-spocs.html',
  styleUrl: './list-client-spocs.scss',
})
export class ListClientSpocs {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  client = input<ClientResponse | null>(null);
  clientSpocs = signal<ClientSpocResponse[]>([]);
  refresh = output<void>();

  constructor() {
    effect(() => {

      if (this.client()?.id) {
        this.getClientSpocs(this.client()!.id);
      }
    });
  }

  getClientSpocs(clientId: number) {
    const route = "/api/master/client-spocs";

    const params = { clientId: clientId };

    this.api.get<ClientSpocResponse[]>(route, params)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: response => {
          this.clientSpocs.set(response);
        }
      });
  }

  openAddClientSpocDialog() {
    const ref = this.dialog.open(AddEditClientSpoc, {
      width: '500px',
      disableClose: true,
      data: {
        client: this.client(),
      },
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.getClientSpocs(this.client()!.id);
        this.refresh.emit();
      }
    });
  }

  openEditClientSpocDialog(clientSpoc: ClientSpocResponse) {
    const ref = this.dialog.open(AddEditClientSpoc, {
      width: '500px',
      disableClose: true,
      data: {
        client: this.client(),
        clientSpoc: clientSpoc
      },
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.getClientSpocs(this.client()!.id);
      }
    });
  }
}
