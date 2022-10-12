import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Theme} from '../types/term';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private themeSubject: BehaviorSubject<Theme>;
  themeObservable: Observable<Theme>;

  constructor() {
    const currentTheme = localStorage.getItem("term-theme");
    const themeDontExist = currentTheme === null;
    const isPossibleTheme = themeDontExist ? false : ["Light", "Dark"].includes(currentTheme);

    if (themeDontExist || !isPossibleTheme) {
      localStorage.setItem("term-theme", "Light");
      this.themeSubject = new BehaviorSubject("Light" as Theme);
    } else {
      this.themeSubject = new BehaviorSubject(currentTheme as Theme);
    }
    this.themeObservable = this.themeSubject.asObservable();
  }

  private toggleStorageTheme(value: Theme) {
    localStorage.setItem("term-theme", value);
    this.themeSubject.next(value);
  }

  changeTheme() {
    this.themeSubject.value === "Light" ?
      this.toggleStorageTheme("Dark") :
      this.toggleStorageTheme("Light");
  }
}
