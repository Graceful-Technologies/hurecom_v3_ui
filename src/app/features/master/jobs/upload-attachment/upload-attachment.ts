import { ApiResponse } from '@/app/core/models/common/api-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { ToastService } from '@/app/core/services/toast-service';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-upload-attachment',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-attachment.html',
  styleUrl: './upload-attachment.scss',
})
export class UploadAttachment {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  private toast = inject(ToastService);

  job = signal<JobResponse | null>(null);
  selectedFiles: File[] = [];

  ngOnInit() {
    this.job.set(this.config?.job);
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    for (const file of files) {
      const isDuplicate = this.selectedFiles.some(
        f =>
          f.name === file.name &&
          f.size === file.size &&
          f.lastModified === file.lastModified
      );

      if (isDuplicate) {
        this.toast.warn(
          `${file.name} has already been selected.`,
          'Duplicate File'
        );
        continue;
      }

      this.selectedFiles.push(file);
    }

    // Trigger change detection if needed
    this.selectedFiles = [...this.selectedFiles];
  }

  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  upload() {
    this.loader.show();
    const route = "/api/recruitment/job-attachments";
    const formData = new FormData();

    formData.append("jobId", this.job()!.id.toString())

    this.selectedFiles.forEach(file => {
      formData.append("files", file);
    });

    this.api.upload<ApiResponse<void>>(route, formData)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.ref.close(true);
        }
      });
  }

  close() {
    this.ref.close();
  }

  formatSize(bytes: number): string {
    if (!bytes) return '0 KB';

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${Math.max(1, Math.round(kb))} KB`;
    }

    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }
}
