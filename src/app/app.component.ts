import { Component, OnInit, Renderer2 } from '@angular/core';
import {ThemeService} from './services/theme.service';
import {Theme} from './types/term';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'term';

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {
    themeService.themeObservable.subscribe((value: Theme) => {
      if (value === "Light") {
        this.renderer.removeClass(document.body, "dark-theme");
      } else {
        this.renderer.removeClass(document.body, "light-theme");
      }
      this.renderer.addClass(document.body, this.themeClassName(value));
    })

    const currentTheme = localStorage.getItem("term-theme") as Theme;
    this.renderer.addClass(document.body, this.themeClassName(currentTheme));
  }

  private themeClassName(value: Theme) {
    return `${value.toLowerCase()}-theme`;
  }

}
