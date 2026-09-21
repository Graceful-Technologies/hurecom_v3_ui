import { TeamResponse } from '@/app/core/models/admin/team-response';
import { UserResponse } from '@/app/core/models/admin/user-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-team-members',
  imports: [MatTableModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './add-team-members.html',
  styleUrl: './add-team-members.scss',
})
export class AddTeamMembers {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  public global = inject(GlobalService);

  team = signal<TeamResponse | null>(null);
  availableUsers = signal<UserResponse[]>([]);
  selectedMembers: UserResponse[] = [];

  ngOnInit() {
    this.team.set(this.config?.team);
    this.availableUsers.set(this.config?.availableUsers || []);
  }

  toggleMember(user: UserResponse) {
    const exists = this.selectedMembers.some(item => item.id === user.id);
    if (exists) {
      this.selectedMembers = this.selectedMembers.filter(item => item.id !== user.id);
      return;
    }
    this.selectedMembers = [...this.selectedMembers, user];
  }

  isSelected(user: UserResponse): boolean {
    return this.selectedMembers.some(item => item.id === user.id);
  }

  addTeamMembers() {
    this.loader.show();
    const route = "/api/admin/team-members";
    const payload = {
      teamId: this.team()!.id,
      userIds: this.selectedMembers.map(member => member.id)
    };

    this.api.post<ApiResponse<void>>(route, payload)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.ref.close(true);
        }
      });
  }

  closeDialog() {
    this.ref.close();
  }
}
