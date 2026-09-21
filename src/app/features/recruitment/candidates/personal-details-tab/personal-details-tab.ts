import { MasterDataResponse } from '@/app/core/models/common/master-data-response';
import { ApiService } from '@/app/core/services/api-service';
import { Component, inject, input, signal } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-personal-details-tab',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
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
