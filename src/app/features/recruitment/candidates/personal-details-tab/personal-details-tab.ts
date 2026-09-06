import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { ApiService } from '@/app/core/services/api-service';
import { Component, inject, input, signal } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-personal-details-tab',
  imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, AutoCompleteModule, TextareaModule, SelectModule, ButtonModule, DatePickerModule],
  templateUrl: './personal-details-tab.html',
  styleUrl: './personal-details-tab.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class PersonalDetailsTab {
  private api = inject(ApiService);

  candidateForm = input.required<FormGroup>();
  genderList = signal<MasterDataResponse[]>([]);

  ngOnInit() {
    this.getGenderList();
  }

  getGenderList() {
    const route = "/api/common/master-data";
    const param = { type: "GENDER" }
    this.api.get<MasterDataResponse[]>(route, param).subscribe({
      next: response => {
        this.genderList.set(response);
      }
    });
  }

}
