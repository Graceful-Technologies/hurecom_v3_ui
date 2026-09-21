import { TeamResponse } from '@/app/core/models/admin/team-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { AddEditTeam } from '../add-edit-team/add-edit-team';
import { ListTeamMembers } from '../list-team-members/list-team-members';

@Component({
  selector: 'app-view-team',
  imports: [CommonModule, MatButtonModule, MatIconModule, ListTeamMembers],
  templateUrl: './view-team.html',
  styleUrl: './view-team.scss',
})
export class ViewTeam {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  team = signal<TeamResponse | null>(null);
  teamId = signal<number | null>(null);

  ngOnInit() {
    this.teamId.set(Number(this.route.snapshot.paramMap.get('id')));
    this.getTeam();
  }

  getTeam() {
    this.loader.show();
    const route = `/api/admin/teams/${this.teamId()}`;
    this.api.get<ApiResponse<TeamResponse>>(route).subscribe({
      next: response => {
        this.team.set(response.data);
        this.loader.hide();
      },
      error: error => {
        this.loader.hide();
      }
    });
  }

  openEditTeamDialog() {
    const ref = this.dialog.open(AddEditTeam, {
      width: '420px',
      disableClose: true,
      data: { team: this.team() },
    });

    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.getTeam();
      }
    });
  }

}
