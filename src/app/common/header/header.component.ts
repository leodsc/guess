import { Component, OnInit } from '@angular/core';
import { Link } from '../types/header';
import { faGamepad, faHomeUser, faQuestion, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "src/app/services/theme.service";
import {Theme} from 'src/app/types/term';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showNav: boolean = false;
  links: Link[] = [
    { name: "Início", link: "/", icon: faHomeUser },
    { name: "Jogos", link: "/games", icon: faGamepad },
    { name: "Sobre", link: "/about", icon: faQuestion }
  ];
  theme: Theme;
  themeIcon = this.selectIcon();
  currentRoute: string = window.location.pathname;

  constructor(
    private themeService: ThemeService,
    private router: Router 
  ) {
    this.theme = localStorage.getItem("term-theme") as Theme;
    themeService.themeObservable.subscribe((value: Theme) => {
      this.theme = value;
      this.themeIcon = this.selectIcon();
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe(navigation => {
      const isNavigationEnd = navigation instanceof NavigationEnd;
      if (isNavigationEnd) {
        const isDifferentRoute = navigation.url !== this.currentRoute; 

        if (isDifferentRoute) {
          this.currentRoute = navigation.url;
          this.toggleNav();
        }
      }
    })
  }

  toggleNav() {
    this.showNav = !this.showNav;

  }

  private selectIcon() {
    return this.theme === "Light" ? faMoon : faSun;
  }

  changeIcon() {
    this.themeService.changeTheme();
  }
}
