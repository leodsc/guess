import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { faTurnDown, faEraser } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  faEraser = faEraser;
  faTurnDown = faTurnDown;

  @HostListener("document:keydown", ['$event'])
  private handleKeyPress(event: KeyboardEvent) {
    // prevent that when clicking in a button, then pressing enter
    // will fire the last key event again
    const key = event.key.toUpperCase();
    const allowedSpecialKeys = ["ENTER", "BACKSPACE", "ARROWRIGHT", "ARROWLEFT"];

    const isAllowedSpecialKey = allowedSpecialKeys.includes(key);
    const isAlphabetical = key.match(/[a-zA-Z]/g) && key.length === 1;

    if (isAllowedSpecialKey || isAlphabetical) {
      if (allowedSpecialKeys.includes(key)) {
        event.preventDefault();
        this.sendSpecial(key);
      } else {
        this.sendKey(key);
      }
    }
  }

  @Input()
  deactivated: string;

  @Output()
  keyEvent = new EventEmitter<string>();

  @Output()
  specialKey = new EventEmitter<string>();

  public specialKeysValues = [ "BACKSPACE", "ENTER" ];
  public keys = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l", "ç", "BACKSPACE"],
    ["z","x","c","v","b","n","m", "ENTER"],
  ]

  constructor() { }

  ngOnInit(): void {
  }

  write($event: MouseEvent | TouchEvent) {
    const element = $event.currentTarget as HTMLElement;
    this.specialKeysValues.includes(element.name) ?
      this.sendSpecial(element.name) :
      this.sendKey(element.name);
  }

  sendKey(key: string | null) {
    if (key === null) {
      throw new Error("null key");
    } else {
      this.keyEvent.emit(key);
    }
  }

  sendSpecial(key: string) {
    this.specialKey.emit(key);
  }
}
