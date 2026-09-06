import { TeamResponse } from '@/app/core/models/admin/team-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddEditTeam } from '../add-edit-team/add-edit-team';

@Component({
  selector: 'app-list-teams',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    RouterLink
  ],
  templateUrl: './list-teams.html',
  styleUrl: './list-teams.scss',
})
export class ListTeams {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(DialogService);

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
      header: "Create Team",
      data: null,
      modal: true,
      closable: true,
      width: '450px'
    });

    ref?.onClose.subscribe((response: any) => {
      if (response) {
        this.searchTeams();
      }
    });
  }

}
