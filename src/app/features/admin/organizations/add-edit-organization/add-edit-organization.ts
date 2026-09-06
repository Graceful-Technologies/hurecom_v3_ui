import { OrganizationResponse } from '@/app/core/models/admin/organization-response';
import { ApiService } from '@/app/core/services/api-service';
import { DrawerService } from '@/app/core/services/drawer-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-add-edit-organization',
  imports: [CommonModule, TabsModule, ButtonModule, InputTextModule, SelectModule, ReactiveFormsModule],
  templateUrl: './add-edit-organization.html',
  styleUrl: './add-edit-organization.scss',
})
export class AddEditOrganization {
  data = input<any>(null);
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly ls = inject(LoaderService);
  private ds = inject(DrawerService);

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
    if (this.data()?.organization) {
      this.patchOrganizationForm(this.data().organization);
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
        this.ds.close("refresh");
      },
      error: error => {
        this.ls.hide();
      }
    });
  }

  close() { }
}
