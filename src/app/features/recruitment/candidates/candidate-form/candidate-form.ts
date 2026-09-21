import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ResumeDetailsTab } from '../resume-details-tab/resume-details-tab';
import { PersonalDetailsTab } from '../personal-details-tab/personal-details-tab';
import { ProfessionalDetailsTab } from '../professional-details-tab/professional-details-tab';
import { CandidateResponse } from '@/app/core/models/recruitment/candidate-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '@/app/core/services/toast-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-candidate-form',
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    ResumeDetailsTab,
    PersonalDetailsTab,
    ProfessionalDetailsTab
  ],
  templateUrl: './candidate-form.html',
  styleUrl: './candidate-form.scss',
})
export class CandidateForm {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  private toast = inject(ToastService);

  candidateForm!: FormGroup;
  isEditMode = signal(false);
  selectedResume = signal<File | null>(null);

  ngOnInit() {
    this.createCandidateForm();

    if (this.config?.candidate) {
      this.isEditMode.set(true);
      this.patchCandidateForm(this.config.candidate);
    }
  }

  createCandidateForm() {
    this.candidateForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobileNumber: [null, Validators.required],
      alternateMobileNumber: [null],
      gender: [null],
      dateOfBirth: [null],

      currentCompany: [null],
      currentDesignation: [null],
      totalExperience: [null],
      relevantExperience: [null],

      skills: [[], Validators.required],
      qualification: [null],

      currentCtc: [null],
      expectedCtc: [null],

      noticePeriod: [null],
      lastWorkingDay: [null],

      currentLocation: [null],
      preferredLocation: [null],
      workModePreference: [null],

      source: [null, Validators.required],
      remarks: [null]
    });
  }

  patchCandidateForm(candidate: CandidateResponse): void {
    this.candidateForm.patchValue({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      mobileNumber: candidate.mobileNumber,
      alternateMobileNumber: candidate.alternateMobileNumber,
      gender: candidate.gender,
      dateOfBirth: candidate.dateOfBirth,

      currentCompany: candidate.currentCompany,
      currentDesignation: candidate.currentDesignation,
      totalExperience: candidate.totalExperience,
      relevantExperience: candidate.relevantExperience,

      skills: candidate.skills,
      qualification: candidate.qualification,

      currentCtc: candidate.currentCtc,
      expectedCtc: candidate.expectedCtc,

      noticePeriod: candidate.noticePeriod,
      lastWorkingDay: candidate.lastWorkingDay,

      currentLocation: candidate.currentLocation,
      preferredLocation: candidate.preferredLocation,
      workModePreference: candidate.workModePreference,

      source: candidate.source,
      remarks: candidate.remarks
    });
  }

  private buildFormData(): FormData {
    const formData = new FormData();

    const value = this.candidateForm.getRawValue();

    Object.entries(value).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(key, val.toString());
      }
    });

    if (this.selectedResume()) {
      formData.append("resume", this.selectedResume()!);
    }

    return formData;
  }

  saveCandidate() {
    console.log(this.candidateForm.value);
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsDirty();
      this.toast.warn("Please fill all required fields correctly.");
      return;
    }

    this.loader.show();
    const route = "/api/recruitment/candidates";
    const payload = this.buildFormData();

    const request = this.isEditMode()
      ? this.api.put<CandidateResponse>(`${route}/${this.candidateForm.value.id}`, payload)
      : this.api.post<CandidateResponse>(route, payload);

    request
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.ref.close(true);
        },
      });
  }

  closeDialog() {
    this.ref.close();
  }
}
