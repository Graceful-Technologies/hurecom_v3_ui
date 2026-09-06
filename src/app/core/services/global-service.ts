import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  getInitials(title: string | undefined): string {
    if (!title) return '+';
    return title
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  getPageLimits() {
    const limits = [
      { label: '10', value: 10 },
      { label: '25', value: 25 },
      { label: '50', value: 50 },
    ]
    return limits;
  }
}
