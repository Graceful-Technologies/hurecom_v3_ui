import { ClientResponse } from '@/app/core/models/master/clients/client-response';
import { ClientSpocResponse } from '@/app/core/models/master/clients/client-spoc-response';
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
  selector: 'app-add-edit-client-spoc',
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule, ToggleSwitchModule],
  templateUrl: './add-edit-client-spoc.html',
  styleUrl: './add-edit-client-spoc.scss',
})
export class AddEditClientSpoc {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private toast = inject(ToastService);

  clientSpocForm!: FormGroup;
  isEditMode = signal(false);

  client = signal<ClientResponse | null>(null);

  ngOnInit() {
    this.client.set(this.config.data?.client);
    this.createClientSpocForm();

    if (this.config.data?.clientSpoc) {
      this.isEditMode.set(true);
      this.patchClientSpocForm(this.config.data.clientSpoc);
    }
  }

  createClientSpocForm() {
    this.clientSpocForm = this.fb.group({
      id: [null],
      clientId: [this.client()!.id],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobileNumber: [null, Validators.required],
      landlineNumber: [null],
      active: [true]
    });
  }

  patchClientSpocForm(clientSpoc: ClientSpocResponse) {
    this.clientSpocForm.patchValue({
      id: clientSpoc.id,
      clientId: clientSpoc.clientId,
      name: clientSpoc.name,
      email: clientSpoc.email,
      mobileNumber: clientSpoc.mobileNumber,
      landlineNumber: clientSpoc.landlineNumber,
      active: clientSpoc.active
    });
  }

  saveClientSpoc() {
    if (this.clientSpocForm.invalid) {
      this.clientSpocForm.markAllAsDirty();
      this.toast.warn('Please fill all required fields correctly.');
      return;
    }

    this.loader.show();
    const route = "/api/master/client-spocs";
    const payload = this.clientSpocForm.value;
    const request = this.isEditMode()
      ? this.api.put<ClientSpocResponse>(`${route}/${payload.id}`, payload)
      : this.api.post<ClientSpocResponse>(route, payload);

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
