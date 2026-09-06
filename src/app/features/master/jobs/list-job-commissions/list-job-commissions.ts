import { JobCommissionResponse } from '@/app/core/models/recruitment/job-commission-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { UpdateCommission } from '../update-commission/update-commission';
import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { LucideIndianRupee, LucidePercent } from '@lucide/angular';

@Component({
  selector: 'app-list-job-commissions',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DecimalPipe,
    DatePipe,
    LucidePercent,
    LucideIndianRupee
  ],
  templateUrl: './list-job-commissions.html',
  styleUrl: './list-job-commissions.scss',
})
export class ListJobCommissions {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(DialogService);

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
      header: 'Update Commission',
      data: { job: this.job(), commissionTypes: this.commissionTypes() },
      modal: true,
      closable: true,
      draggable: false,
      maximizable: false,
      dismissableMask: false,
      width: '400px'
    });

    ref?.onClose.subscribe((response) => {
      if (response) {
        this.getCommissions();
      }
    });
  }
}
