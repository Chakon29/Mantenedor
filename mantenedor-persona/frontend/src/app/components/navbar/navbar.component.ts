import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Cambiado de styleUrl a styleUrls
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  responsiveMenu(): void {
    const navbarNav = document.getElementById("navbarNav");
    if (navbarNav) {
      navbarNav.classList.toggle("show", !navbarNav.classList.contains("show"));
    }
  }
}
