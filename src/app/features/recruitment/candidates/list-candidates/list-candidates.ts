import { Paginator } from '@/app/core/components/paginator/paginator';
import { PageResponse } from '@/app/core/models/common/page-response';
import { CandidateResponse } from '@/app/core/models/recruitment/candidate-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CandidateForm } from '../candidate-form/candidate-form';
import { LucideBuilding2, LucideGraduationCap, LucideIndianRupee, LucideMail, LucidePhone } from '@lucide/angular';

@Component({
  selector: 'app-list-candidates',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    Paginator,
    LucidePhone,
    LucideMail,
    LucideBuilding2,
    LucideIndianRupee,
    LucideGraduationCap
  ],
  templateUrl: './list-candidates.html',
  styleUrl: './list-candidates.scss',
})
export class ListCandidates {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  candidates = signal<CandidateResponse[]>([]);
  currentPage = signal(0);
  totalRecords = signal(0);
  rowsPerPage = signal(10);

  ngOnInit(): void {
    this.searchCandidates();
  }

  searchCandidates() {
    const route = "/api/recruitment/candidates/search";
    const payload = {
      page: this.currentPage() + 1,
      limit: this.rowsPerPage(),
    };
    this.api.search<PageResponse<CandidateResponse>>(route, payload).subscribe({
      next: response => {
        this.candidates.set(response.content);
        this.totalRecords.set(response.totalElements);
      },
      error: error => {
        this.candidates.set([]);
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.rowsPerPage.set(event.rows);
    this.searchCandidates();
  }

  openAddCandidateDialog(): void {
    const ref = this.dialog.open(CandidateForm, {
      data: null,
      width: '95vw',
      maxWidth: '1200px',
      height: '90vh',
      disableClose: true
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.searchCandidates();
      }
    });
  }

  openEditCandidateDialog(candidate: CandidateResponse): void {
    const ref = this.dialog.open(CandidateForm, {
      data: {
        candidate: candidate
      },
      width: '95vw',
      maxWidth: '1200px',
      height: '90vh',
      disableClose: true
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.searchCandidates();
      }
    });
  }


  getVisibleSkills(skills: string[]): string[] {
    return skills.slice(0, 3);
  }

  getRemainingSkillsCount(skills: string[]): number {
    return Math.max(skills.length - 3, 0);
  }
}
