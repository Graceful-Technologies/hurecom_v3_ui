import { ApiResponse } from '@/app/core/models/common/api-response';
import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-commission',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './update-commission.html',
  styleUrl: './update-commission.scss',
})
export class UpdateCommission {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private toast = inject(ToastService);

  commissionForm!: FormGroup;
  job = signal<JobResponse | null>(null);
  commissionTypes = signal<MasterDataResponse[]>([]);

  ngOnInit() {
    this.job.set(this.config.data.job);
    this.commissionTypes.set(this.config.data.commissionTypes);
    this.createCommissionForm();
  }

  createCommissionForm() {
    this.commissionForm = this.fb.group({
      id: [null],
      jobId: [this.job()!.id],
      commissionType: [null, Validators.required],
      commissionValue: [null, Validators.required],
      guaranteePeriodDays: [null, Validators.required],
    });
  }

  updateCommission() {
    const route = "/api/recruitment/job-commissions";
    const payload = this.commissionForm.value;
    this.api.post<ApiResponse<void>>(route, payload)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.ref.close(true);
        }
      });
  }

  closeDialog() {
    this.ref.close();
  }
}
