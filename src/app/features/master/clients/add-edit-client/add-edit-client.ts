import { ApiResponse } from '@/app/core/models/common/api-response';
import { ClientResponse } from '@/app/core/models/master/clients/client-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-edit-client',
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule,
    ToggleSwitchModule],
  templateUrl: './add-edit-client.html',
  styleUrl: './add-edit-client.scss',
})
export class AddEditClient {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private toast = inject(ToastService);

  clientForm!: FormGroup;
  isEditMode = signal(false);

  ngOnInit() {
    this.createClientForm();

    if (this.config.data?.team) {
      this.isEditMode.set(true);
      this.patchClientForm(this.config.data.client);
    }
  }

  createClientForm() {
    this.clientForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      active: [true]
    });
  }

  patchClientForm(client: ClientResponse) {
    this.clientForm.patchValue({
      id: client.id,
      name: client.name,
      active: client.active
    });
  }

  saveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsDirty();
      this.toast.warn('Please fill all required fields correctly.');
      return;
    }

    this.loader.show();
    const route = "/api/master/clients";
    const payload = this.clientForm.value;
    const request = this.isEditMode()
      ? this.api.put<ApiResponse<ClientResponse>>(`${route}/${payload.id}`, payload)
      : this.api.post<ApiResponse<ClientResponse>>(route, payload);

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
