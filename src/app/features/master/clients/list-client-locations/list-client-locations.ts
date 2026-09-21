import { UserResponse } from '@/app/core/models/admin/user-response';
import { ClientLocationResponse } from '@/app/core/models/master/clients/client-location-response';
import { ClientResponse } from '@/app/core/models/master/clients/client-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { AddEditClientLocation } from '../add-edit-client-location/add-edit-client-location';

@Component({
  selector: 'app-list-client-locations',
  imports: [CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './list-client-locations.html',
  styleUrl: './list-client-locations.scss',
})
export class ListClientLocations {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  client = input<ClientResponse | null>(null);
  clientLocations = signal<ClientLocationResponse[]>([]);
  refresh = output<void>();

  constructor() {
    effect(() => {

      if (this.client()?.id) {
        this.getClientLocations(this.client()!.id);
      }
    });
  }

  getClientLocations(clientId: number) {
    const route = "/api/master/client-locations";

    const params = { clientId: clientId };

    this.api.get<ClientLocationResponse[]>(route, params)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: response => {
          this.clientLocations.set(response);
        }
      });
  }

  openAddClientLocationDialog() {
    const ref = this.dialog.open(AddEditClientLocation, {
      width: '500px',
      disableClose: true,
      data: {
        client: this.client(),
      },
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.getClientLocations(this.client()!.id);
        this.refresh.emit();
      }
    });
  }

  openEditClientLocationDialog(clientLocation: ClientLocationResponse) {
    const ref = this.dialog.open(AddEditClientLocation, {
      width: '500px',
      disableClose: true,
      data: {
        client: this.client(),
        clientLocation: clientLocation
      },
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.getClientLocations(this.client()!.id);
      }
    });
  }
}
