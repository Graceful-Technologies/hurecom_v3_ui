import { Component, inject, input, output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEditJob } from '../add-edit-job/add-edit-job';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { EditorModule } from 'primeng/editor';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { LucideBriefcase, LucideBuilding2, LucideCalendar, LucideMapPin, LucideMonitor, LucideTag, LucideUser, LucideUsers, LucideWallet } from '@lucide/angular';
import { GlobalService } from '@/app/core/services/global-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-job-details',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TabsModule,
    EditorModule,
    ChipModule,
    DividerModule,
    LucideUsers,
    LucideBriefcase,
    LucideMonitor,
    LucideMapPin,
    LucideBuilding2,
    LucideUser, LucideWallet, LucideTag, LucideCalendar
  ],
  templateUrl: './view-job-details.html',
  styleUrl: './view-job-details.scss',
})
export class ViewJobDetails {
  private dialog = inject(DialogService);
  public global = inject(GlobalService);
  job = input<JobResponse | null>(null);
  jobUpdated = output<void>();
  jobDescription: string | undefined;

  ngAfterViewInit() {
    this.jobDescription = this.job()?.jobDescription;
  }

  openEditJobDialog() {
    const ref = this.dialog.open(AddEditJob, {
      header: 'Edit Job',
      data: { job: this.job() },
      modal: true,
      closable: true,
      draggable: false,
      maximizable: false,
      dismissableMask: false,
      width: '85vw',
      breakpoints: {
        '1200px': '85vw',
        '768px': '95vw'
      }
    });

    ref?.onClose.subscribe((response) => {
      if (response) {
        this.jobUpdated.emit();
      }
    });
  }
}
