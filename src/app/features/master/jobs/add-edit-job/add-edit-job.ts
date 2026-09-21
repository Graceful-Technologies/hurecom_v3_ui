import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { ClientLocationResponse } from '@/app/core/models/master/clients/client-location-response';
import { ClientResponse } from '@/app/core/models/master/clients/client-response';
import { ClientSpocResponse } from '@/app/core/models/master/clients/client-spoc-response';
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
  selector: 'app-add-edit-job',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-job.html',
  styleUrl: './add-edit-job.scss',
})
export class AddEditJob {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  private toast = inject(ToastService);

  jobForm!: FormGroup;
  isEditMode = signal(false);

  statusList = signal<MasterDataResponse[]>([]);
  clients = signal<ClientResponse[]>([]);
  clientLocations = signal<ClientLocationResponse[]>([]);
  clientSpocs = signal<ClientSpocResponse[]>([]);
  workModes = signal<MasterDataResponse[]>([]);
  employmentTypes = signal<MasterDataResponse[]>([]);

  ngOnInit() {
    this.createJobForm();
    this.getStatusList();
    this.getWorkModes();
    this.getEmploymentTypes();
    this.getActiveClients();
    this.registerDropdownChanges();

    if (this.config?.job) {
      this.isEditMode.set(true);
      this.patchJobForm(this.config.job);
    }
  }

  createJobForm() {
    this.jobForm = this.fb.group({
      id: [null],
      clientId: [null],
      clientLocationId: [null],
      clientSpocId: [null],
      title: [null, Validators.required],
      openPositions: [null, Validators.required],
      jobDescription: [null, Validators.required],
      minExperience: [null, Validators.required],
      maxExperience: [null, Validators.required],
      maxCtc: [null, Validators.required],
      skills: [null, Validators.required],
      employmentType: [null, Validators.required],
      workMode: [null, Validators.required],
      status: ["DRAFT"]
    });
  }

  patchJobForm(job: JobResponse) {
    this.jobForm.patchValue({
      id: job.id,
      clientId: job.clientId,
      clientLocationId: job.clientLocationId,
      clientSpocId: job.clientSpocId,
      title: job.title,
      openPositions: job.openPositions,
      jobDescription: job.jobDescription,
      minExperience: job.minExperience,
      maxExperience: job.maxExperience,
      maxCtc: job.maxCtc,
      skills: job.skills,
      employmentType: job.employmentType,
      workMode: job.workMode,
      status: job.status
    });

    this.getActiveClientLocations(job.clientId);
    this.getActiveClientSpocs(job.clientId);
  }

  registerDropdownChanges() {
    this.jobForm.controls['clientId'].valueChanges.subscribe(clientId => {
      this.clientLocations.set([]);
      this.clientSpocs.set([]);

      this.jobForm.patchValue({
        clientLocationId: null,
        clientSpocId: null
      }, { emitEvent: false });

      if (clientId) {
        this.getActiveClientLocations(clientId);
        this.getActiveClientSpocs(clientId);
      }
    });
  }

  getStatusList() {
    const route = "/api/common/master-data";
    const param = { type: "JOB_STATUS" }
    this.api.get<MasterDataResponse[]>(route, param).subscribe({
      next: response => {
        this.statusList.set(response);
      }
    });
  }

  getWorkModes() {
    const route = "/api/common/master-data";
    const param = { type: "WORK_MODE" }
    this.api.get<MasterDataResponse[]>(route, param).subscribe({
      next: response => {
        this.workModes.set(response);
      }
    });
  }

  getEmploymentTypes() {
    const route = "/api/common/master-data";
    const param = { type: "EMPLOYMENT_TYPE" }
    this.api.get<MasterDataResponse[]>(route, param).subscribe({
      next: response => {
        this.employmentTypes.set(response);
      }
    });
  }


  getActiveClients() {
    const route = "/api/master/clients/active";
    this.api.get<ClientResponse[]>(route).subscribe({
      next: response => {
        this.clients.set(response);
      }
    });
  }

  getActiveClientLocations(clientId: number) {
    const route = "/api/master/client-locations/active";
    const param = { clientId: clientId };
    this.api.get<ClientLocationResponse[]>(route, param).subscribe({
      next: response => {
        this.clientLocations.set(response);
      }
    });
  }

  getActiveClientSpocs(clientId: number) {
    const route = "/api/master/client-spocs/active";
    const param = { clientId: clientId };
    this.api.get<ClientSpocResponse[]>(route, param).subscribe({
      next: response => {
        this.clientSpocs.set(response);
      }
    });
  }

  saveJob() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsDirty();
      this.toast.warn("Please fill all required fields correctly.");
      return;
    }

    this.loader.show();
    const route = "/api/recruitment/jobs";
    const payload = {
      ...this.jobForm.value,
      skills: this.parseSkills(this.jobForm.value.skills)
    };
    const request = this.isEditMode()
      ? this.api.put<JobResponse>(`${route}/${payload.id}`, payload)
      : this.api.post<JobResponse>(route, payload);

    request
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.ref.close(true);
        },
      });
  }

  parseSkills(value: string | string[] | null): string[] {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }

  closeDialog() {
    this.ref.close();
  }
}
