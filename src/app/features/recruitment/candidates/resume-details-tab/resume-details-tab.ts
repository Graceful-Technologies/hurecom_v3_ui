import { Component, model, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-resume-details-tab',
  imports: [FileUploadModule, ButtonModule],
  templateUrl: './resume-details-tab.html',
  styleUrl: './resume-details-tab.scss',
})
export class ResumeDetailsTab {
  selectedResume = model<File | null>(null);

  onResumeSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedResume.set(input.files[0]);
    }
  }

  deleteResume(fileInput: HTMLInputElement): void {

    this.selectedResume.set(null);

    fileInput.value = '';

  }

  parseResume(): void {

    const resume = this.selectedResume();

    if (!resume) {
      return;
    }

    console.log('Parse Resume:', resume);

    // TODO:
    // Call Resume Parsing API

  }

  formatFileSize(bytes: number): string {

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  }

  get resume(): File | null {
    return this.selectedResume();
  }
}
