import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  _PLATFORM_ID = inject(PLATFORM_ID);
  router = inject(Router);

  token!: string | null;

  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('token');
    }
  } 
  ngDoCheck(){
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('token');
    }
  }

  logout() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
