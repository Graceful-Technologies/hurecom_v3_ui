import { TeamResponse } from '@/app/core/models/admin/team-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-edit-team',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './add-edit-team.html',
  styleUrl: './add-edit-team.scss',
})
export class AddEditTeam {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  private toast = inject(ToastService);

  teamForm!: FormGroup;
  isEditMode = signal(false);

  ngOnInit() {
    this.createTeamForm();

    if (this.config?.team) {
      this.isEditMode.set(true);
      this.patchTeamForm(this.config.team);
    }
  }

  createTeamForm() {
    this.teamForm = this.fb.group({
      id: [null],
      code: [null, Validators.required],
      name: [null, Validators.required],
      active: [true]
    });
  }

  patchTeamForm(team: TeamResponse) {
    this.teamForm.patchValue({
      id: team.id,
      code: team.code,
      name: team.name,
      active: team.active
    });
  }

  saveTeam() {
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsDirty();
      this.toast.warn('Please fill all required fields correctly.');
      return;
    }

    this.loader.show();
    const route = "/api/admin/teams";
    const payload = this.teamForm.value;
    const request = this.isEditMode()
      ? this.api.put<ApiResponse<TeamResponse>>(`${route}/${payload.id}`, payload)
      : this.api.post<ApiResponse<TeamResponse>>(route, payload);

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
