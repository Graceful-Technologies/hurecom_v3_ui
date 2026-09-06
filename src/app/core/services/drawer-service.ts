import { Injectable, signal } from '@angular/core';

export interface DrawerConfig {
  title: string;
  subtitle: string;
  component: any;
  data?: any;
  onClose?: (result?: any) => void;
}

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  config = signal<DrawerConfig | null>(null);

  open(config: DrawerConfig) {
    this.config.set(config);
  }

  close(result?: any) {
    const current = this.config();
    if (current?.onClose) {
      current.onClose(result);
    }
    this.config.set(null);
  }
}
