import { TeamResponse } from '@/app/core/models/admin/team-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTeam } from '../add-edit-team/add-edit-team';

@Component({
  selector: 'app-list-teams',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './list-teams.html',
  styleUrl: './list-teams.scss',
})
export class ListTeams {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  teams = signal<TeamResponse[]>([]);

  ngOnInit(): void {
    this.searchTeams();
  }

  searchTeams() {
    const route = "/api/admin/teams";

    this.api.get<ApiResponse<TeamResponse[]>>(route).subscribe({
      next: response => {
        this.teams.set(response.data);
      },
      error: error => {
        this.teams.set([]);
      }
    });
  }


  openAddTeamDialog(): void {
    const ref = this.dialog.open(AddEditTeam, {
      data: null,
      disableClose: true,
      width: '450px'
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.searchTeams();
      }
    });
  }

}
