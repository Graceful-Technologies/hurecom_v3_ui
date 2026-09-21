import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from '../../components/loader/loader';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, Header, Sidebar, Loader],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {}
