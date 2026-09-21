import { ApiResponse } from '@/app/core/models/common/api-response';
import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-commission',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './update-commission.html',
  styleUrl: './update-commission.scss',
})
export class UpdateCommission {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  private toast = inject(ToastService);

  commissionForm!: FormGroup;
  job = signal<JobResponse | null>(null);
  commissionTypes = signal<MasterDataResponse[]>([]);

  ngOnInit() {
    this.job.set(this.config?.job);
    this.commissionTypes.set(this.config?.commissionTypes || []);
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
