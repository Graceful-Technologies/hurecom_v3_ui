import { OrganizationResponse } from '@/app/core/models/admin/organization-response';
import { ApiService } from '@/app/core/services/api-service';
import { DrawerService } from '@/app/core/services/drawer-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-edit-organization',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './add-edit-organization.html',
  styleUrl: './add-edit-organization.scss',
})
export class AddEditOrganization {
  data = input<any>(null);
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly ls = inject(LoaderService);
  private ds = inject(DrawerService);
  private dialogRef = inject(MatDialogRef<AddEditOrganization>);
  private dialogData = inject(MAT_DIALOG_DATA, { optional: true });

  statuses = signal<any>([
    {
      code: "Active",
      name: "Active"
    },
    {
      code: "Inactive",
      name: "Inactive"
    }
  ]);

  organizationForm!: FormGroup;

  ngOnInit() {
    this.createOrganizationForm();
    const organization = this.data()?.organization ?? this.dialogData?.organization;
    if (organization) {
      this.patchOrganizationForm(organization);
    }
  }

  createOrganizationForm() {
    this.organizationForm = this.fb.group({
      name: ["", Validators.required],
      active: ["Active"]
    });
  }

  patchOrganizationForm(organization: OrganizationResponse) {
    this.organizationForm.patchValue({
      id: organization.id,
      name: organization.name,
      active: organization.active ? "Active" : "Inactive"
    });
  }

  createOrganization() {
    this.ls.show();
    const route = "/api/admin/organizations";
    const formValue = this.organizationForm.value;

    const payload = {
      ...formValue,
      active: formValue.active === "Active"
    };

    this.api.post(route, payload).subscribe({
      next: response => {
        this.ls.hide();
        this.dialogRef.close(true);
      },
      error: error => {
        this.ls.hide();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
