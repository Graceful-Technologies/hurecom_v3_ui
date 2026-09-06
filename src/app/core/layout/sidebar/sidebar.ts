// sidebar.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideBriefcase, LucideBuilding, LucideBuilding2, LucideCircleUser, LucideLayoutDashboard, LucideShieldCogCorner, LucideUser, LucideUserKey } from '@lucide/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideLayoutDashboard,
    LucideCircleUser,
    LucideUser,
    LucideUserKey,
    LucideShieldCogCorner,
    LucideBuilding,
    LucideBuilding2,
    LucideBriefcase
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  adminExpanded = true;

  jobExpanded = true;

  toggleAdminMenu(): void {
    this.adminExpanded = !this.adminExpanded;
  }

  toggleJobMenu(): void {
    this.jobExpanded = !this.jobExpanded;
  }

}