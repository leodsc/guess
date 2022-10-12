import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  @HostListener("document:keypress", ['$event'])
  private handleKeyPress(event: KeyboardEvent) {
    // prevent that when clicking in a button, then pressing enter
    // will fire the last key event again
    event.preventDefault();
    const key = event.key.toUpperCase();
    const allowedSpecialKeys = ["ENTER", "BACKSPACE"];

    const isAllowedSpecialKey = allowedSpecialKeys.includes(key);
    const isAlphabetical = key.match(/[a-zA-Z]/g);

    if (isAllowedSpecialKey || isAlphabetical) {
      if (key === "ENTER" || key === "BACKSPACE") {
        this.sendSpecial(key);
      } else {
        this.sendKey(key);
      }
    }
  }

  @Output()
  keyEvent = new EventEmitter<string>();

  @Output()
  specialKey = new EventEmitter<string>();

  public keys = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l", "ç"],
    ["z","x","c","v","b","n","m"],
  ]

  constructor() { }

  ngOnInit(): void {
  }

  write($event: MouseEvent | TouchEvent) {
    const element = $event.target as HTMLElement;
    this.sendKey(element.textContent);
  }

  sendKey(key: string | null) {
    console.log('key');
    if (key === null) {
      throw new Error("null key");
    } else {
      this.keyEvent.emit(key);
    }
  }

  sendSpecial(key: string) {
    console.log("special");
    this.specialKey.emit(key);
  }
}
