import { JobCommissionResponse } from '@/app/core/models/recruitment/job-commission-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { UpdateCommission } from '../update-commission/update-commission';
import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list-job-commissions',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './list-job-commissions.html',
  styleUrl: './list-job-commissions.scss',
})
export class ListJobCommissions {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  job = input<JobResponse | null>(null);
  commissions = signal<JobCommissionResponse[]>([]);
  commissionTypes = signal<MasterDataResponse[]>([]);

  ngAfterViewInit() {
    this.getCommissions();
    this.getCommissionTypes();
  }

  getCommissions() {
    const route = "/api/recruitment/job-commissions";
    const param = { jobId: this.job()?.id };
    this.api.get<JobCommissionResponse[]>(route, param)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: response => {
          this.commissions.set(response);
        },
        error: error => {
          this.commissions.set([]);
        }
      });
  }

  getCommissionTypes() {
    const route = "/api/common/master-data";
    const param = { type: 'COMMISSION_TYPE' };
    this.api.get<MasterDataResponse[]>(route, param).subscribe({
      next: response => {
        this.commissionTypes.set(response);
      },
      error: error => {
        this.commissionTypes.set([]);
      }
    });
  }

  openUpdateCommissionDialog() {
    const ref = this.dialog.open(UpdateCommission, {
      width: '420px',
      disableClose: true,
      data: { job: this.job(), commissionTypes: this.commissionTypes() },
    });

    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.getCommissions();
      }
    });
  }
}
