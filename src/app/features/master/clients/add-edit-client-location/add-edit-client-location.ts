import { CityResponse } from '@/app/core/models/common/city-response';
import { CountryResponse } from '@/app/core/models/common/country-response';
import { StateResponse } from '@/app/core/models/common/state-response';
import { ClientLocationResponse } from '@/app/core/models/master/clients/client-location-response';
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
  selector: 'app-add-edit-client-location',
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule,
    ToggleSwitchModule],
  templateUrl: './add-edit-client-location.html',
  styleUrl: './add-edit-client-location.scss',
})
export class AddEditClientLocation {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private toast = inject(ToastService);

  clientLocationForm!: FormGroup;
  isEditMode = signal(false);

  client = signal<ClientResponse | null>(null);
  countries = signal<CountryResponse[]>([]);
  states = signal<StateResponse[]>([]);
  cities = signal<CityResponse[]>([]);

  ngOnInit() {
    this.client.set(this.config.data?.client);
    this.createClientLocationForm();
    this.getCountries();
    this.registerDropdownChanges();

    if (this.config.data?.clientLocation) {
      this.isEditMode.set(true);
      this.patchClientLocationForm(this.config.data.clientLocation);
    }
  }

  createClientLocationForm() {
    this.clientLocationForm = this.fb.group({
      id: [null],
      clientId: [this.client()!.id],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
      branchName: [null, Validators.required],
      active: [true]
    });
  }

  patchClientLocationForm(clientLocation: ClientLocationResponse) {
    this.clientLocationForm.patchValue({
      id: clientLocation.id,
      clientId: clientLocation.clientId,
      countryId: clientLocation.countryId,
      stateId: clientLocation.stateId,
      cityId: clientLocation.cityId,
      branchName: clientLocation.branchName,
      active: clientLocation.active
    });

    this.getStates(clientLocation.countryId);
    this.getCities(clientLocation.stateId);
  }

  registerDropdownChanges() {
    this.clientLocationForm.controls['countryId'].valueChanges.subscribe(countryId => {
      this.states.set([]);
      this.cities.set([]);

      this.clientLocationForm.patchValue({
        stateId: null,
        cityId: null
      }, { emitEvent: false });

      if (countryId) {
        this.getStates(countryId);
      }
    });

    this.clientLocationForm.controls['stateId'].valueChanges.subscribe(stateId => {
      this.cities.set([]);

      this.clientLocationForm.patchValue({
        cityId: null
      }, { emitEvent: false });

      if (stateId) {
        this.getCities(stateId);
      }
    });
  }

  getCountries() {
    const route = "/api/common/countries";
    this.api.get<CountryResponse[]>(route).subscribe({
      next: response => {
        this.countries.set(response);
      }
    });
  }

  getStates(countryId: number) {
    const route = "/api/common/states";
    const param = { countryId: countryId }
    this.api.get<StateResponse[]>(route, param).subscribe({
      next: response => {
        this.states.set(response);
      }
    });
  }

  getCities(stateId: number) {
    const route = "/api/common/cities";
    const param = { stateId: stateId }
    this.api.get<CityResponse[]>(route, param).subscribe({
      next: response => {
        this.cities.set(response);
      }
    });
  }

  saveClientLocation() {
    if (this.clientLocationForm.invalid) {
      this.clientLocationForm.markAllAsDirty();
      this.toast.warn('Please fill all required fields correctly.');
      return;
    }

    this.loader.show();
    const route = "/api/master/client-locations";
    const payload = this.clientLocationForm.value;
    const request = this.isEditMode()
      ? this.api.put<ClientLocationResponse>(`${route}/${payload.id}`, payload)
      : this.api.post<ClientLocationResponse>(route, payload);

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
