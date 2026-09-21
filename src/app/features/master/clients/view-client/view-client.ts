import { ClientResponse } from '@/app/core/models/master/clients/client-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AddEditClient } from '../add-edit-client/add-edit-client';
import { ListClientLocations } from '../list-client-locations/list-client-locations';
import { ListClientSpocs } from '../list-client-spocs/list-client-spocs';

@Component({
  selector: 'app-view-client',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, ListClientLocations, ListClientSpocs],
  templateUrl: './view-client.html',
  styleUrl: './view-client.scss',
})
export class ViewClient {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  client = signal<ClientResponse | null>(null);
  clientId = signal<number | null>(null);

  ngOnInit() {
    this.clientId.set(Number(this.route.snapshot.paramMap.get('id')));
    this.getClient();
  }

  getClient() {
    this.loader.show();
    const route = `/api/master/clients/${this.clientId()}`;
    this.api.get<ClientResponse>(route).subscribe({
      next: response => {
        this.client.set(response);
        this.loader.hide();
      },
      error: error => {
        this.loader.hide();
      }
    });
  }

  openEditClientDialog() {
    const ref = this.dialog.open(AddEditClient, {
      width: '450px',
      disableClose: true,
      data: { client: this.client() },
    });

    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.getClient();
      }
    });
  }
}
