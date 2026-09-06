import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { UploadAttachment } from '../upload-attachment/upload-attachment';
import { JobAttachmentResponse } from '@/app/core/models/recruitment/job-attachment-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list-job-attachments',
  imports: [
    TableModule,
    ButtonModule,
  ],
  templateUrl: './list-job-attachments.html',
  styleUrl: './list-job-attachments.scss',
})
export class ListJobAttachments {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(DialogService);

  job = input<JobResponse | null>(null);
  attachments = signal<any[]>([]);

  ngAfterViewInit() {
    this.getAttachments();
  }

  getAttachments() {
    const route = "/api/recruitment/job-attachments";
    const param = { jobId: this.job()?.id };
    this.api.get<JobAttachmentResponse[]>(route, param).subscribe({
      next: response => {
        this.attachments.set(response);
      },
      error: error => {
        this.attachments.set([]);
      }
    });
  }

  openUploadAttachmentDialog() {
    const ref = this.dialog.open(UploadAttachment, {
      header: 'Upload',
      data: { job: this.job() },
      modal: true,
      closable: true,
      draggable: false,
      maximizable: false,
      dismissableMask: false,
      width: '600px'
    });

    ref?.onClose.subscribe((response) => {
      if (response) {
        this.getAttachments();
      }
    });
  }

  downloadAttachment(attachment: JobAttachmentResponse) {
    const route = `/api/recruitment/job-attachments/${attachment.id}`;
    this.api.download(route).subscribe({
      next: (response: any) => {

        console.log(response);

        const blob = response.body;
        const contentDisposition = response.headers.get('content-disposition');

        let fileName = 'download';

        if (contentDisposition) {
          console.log(contentDisposition)
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match && match[1]) {
            fileName = match[1];
          }
        }

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed', err);
      }
    });
  }

  removeAttachment(attachment: JobAttachmentResponse) {
    this.loader.show();
    const route = `/api/recruitment/job-attachments/${attachment.id}`;
    this.api.delete<ApiResponse<void>>(route)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.getAttachments();
        }
      });
  }
}
