import { TeamMemberResponse } from '@/app/core/models/admin/team-member-response';
import { TeamResponse } from '@/app/core/models/admin/team-response';
import { UserResponse } from '@/app/core/models/admin/user-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { DatePipe } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { AddTeamMembers } from '../add-team-members/add-team-members';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list-team-members',
  imports: [TableModule, DatePipe, ButtonModule],
  templateUrl: './list-team-members.html',
  styleUrl: './list-team-members.scss',
})
export class ListTeamMembers {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(DialogService);

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
      header: 'Add Team Member',
      data: {
        team: this.team(),
        availableUsers: this.availableUsers()
      },
      modal: true,
      closable: true,
      dismissableMask: false,
      width: '700px'
    });

    ref?.onClose.subscribe((response: any) => {
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
