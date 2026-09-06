import { OrganizationResponse } from '@/app/core/models/admin/organization-response';
import { RoleResponse } from '@/app/core/models/admin/role-response';
import { UserResponse } from '@/app/core/models/admin/user-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-add-edit-user',
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule],
  templateUrl: './add-edit-user.html',
  styleUrl: './add-edit-user.scss',
})
export class AddEditUser {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private toast = inject(ToastService);

  userForm!: FormGroup;
  isEditMode = signal(false);
  organizations = signal<OrganizationResponse[]>([]);
  roles = signal<RoleResponse[]>([]);

  ngOnInit() {
    this.createUserForm();
    this.getOrganizations();
    this.getRoles();

    if (this.config.data?.user) {
      this.isEditMode.set(true);
      this.patchUserForm(this.config.data.user);
    }
  }

  createUserForm() {
    this.userForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobileNumber: [null, Validators.required],
      organizationId: [null, Validators.required],
      roleId: [null, Validators.required],
      active: [true]
    });
  }

  patchUserForm(user: UserResponse) {
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      organizationId: user.organizationId,
      roleId: user.roleId,
      active: user.active
    });

    this.userForm.controls['organizationId'].disable();
  }

  getOrganizations() {
    const route = "/api/admin/organizations";
    this.api.get<OrganizationResponse[]>(route).subscribe({
      next: response => {
        this.organizations.set(response);
      },
      error: error => {
        this.organizations.set([]);
      }
    });
  }

  getRoles() {
    const route = "/api/admin/roles";
    this.api.get<RoleResponse[]>(route).subscribe({
      next: response => {
        this.roles.set(response);
      },
      error: error => {
        this.roles.set([]);
      }
    });
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsDirty();
      this.toast.warn('Please fill all required fields correctly.');
      return;
    }

    this.loader.show();

    const route = "/api/admin/users";
    const payload = this.userForm.value;
    const request = this.isEditMode()
      ? this.api.put(`${route}/${payload.id}`, payload)
      : this.api.post(route, payload);

    request.subscribe({
      next: () => {
        this.loader.hide();
        this.toast.success(`User ${this.isEditMode() ? 'updated' : 'created'} successfully`);
        this.ref.close(true);
      },
      error: (err) => {
        this.loader.hide();
        this.toast.error('An error occurred while saving the user.');
      }
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
