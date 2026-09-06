import { Component } from '@angular/core';
import { CandidateForm } from '../candidate-form/candidate-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-candidate',
  imports: [
    CommonModule,
    CandidateForm
  ],
  templateUrl: './add-candidate.html',
  styleUrl: './add-candidate.scss',
})
export class AddCandidate { }
