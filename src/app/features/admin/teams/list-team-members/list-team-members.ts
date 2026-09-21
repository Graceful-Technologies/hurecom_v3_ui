import { TeamMemberResponse } from '@/app/core/models/admin/team-member-response';
import { TeamResponse } from '@/app/core/models/admin/team-response';
import { UserResponse } from '@/app/core/models/admin/user-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { DatePipe } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddTeamMembers } from '../add-team-members/add-team-members';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list-team-members',
  imports: [MatTableModule, DatePipe, MatButtonModule],
  templateUrl: './list-team-members.html',
  styleUrl: './list-team-members.scss',
})
export class ListTeamMembers {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  team = input<TeamResponse | null>(null);
  teamMembers = signal<TeamMemberResponse[]>([]);
  availableUsers = signal<UserResponse[]>([]);
  refresh = output<void>();

  constructor() {
    effect(() => {
      const team = this.team();

      if (team?.id) {
        this.getTeamMembers(team.id);
        this.getAvailableUsers(team.id);
      }
    });
  }

  getTeamMembers(teamId: number) {
    const route = "/api/admin/team-members";

    const params = { teamId: teamId };

    this.api.get<ApiResponse<TeamMemberResponse[]>>(route, params)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: response => {
          this.teamMembers.set(response.data);
        }
      });
  }

  getAvailableUsers(teamId: number) {
    const route = "/api/admin/users/available";
    const params = { teamId: teamId };
    this.api.get<UserResponse[]>(route, params).subscribe({
      next: response => {
        this.availableUsers.set(response);
      },
    });
  }

  openAddMemberDialog() {
    const ref = this.dialog.open(AddTeamMembers, {
      width: '700px',
      disableClose: true,
      data: {
        team: this.team(),
        availableUsers: this.availableUsers()
      }
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.getTeamMembers(this.team()!.id);
        this.getAvailableUsers(this.team()!.id);
        this.refresh.emit();
      }
    });
  }

  removeTeamMember(teamMember: TeamMemberResponse) {
    const route = `/api/admin/team-members/${teamMember.id}`;
    this.api.delete<ApiResponse<void>>(route)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.getTeamMembers(this.team()!.id);
          this.getAvailableUsers(this.team()!.id);
          this.refresh.emit();
        }
      });
  }
}
