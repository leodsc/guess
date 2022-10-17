import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { faTurnDown, faEraser } from "@fortawesome/free-solid-svg-icons"
import {KeyboardService} from 'src/app/services/keyboard.service';

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
    event.preventDefault();
    const key = event.key.toUpperCase();

    const keyType = this.isSpecialOrNormalKey(key);
    if (keyType !== false) {
      this.keyboardService.send({
        value: key,
        type: keyType
      });
    }
  }

  inactiveKeys: string[] = [];
  public specialKeysValues = [ "BACKSPACE", "ENTER" ];
  public keys = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l", "ç", "BACKSPACE"],
    ["z","x","c","v","b","n","m", "ENTER"],
  ]

  constructor(private keyboardService: KeyboardService) { }

  ngOnInit(): void {
    this.keyboardService.inactiveKeysObservable.subscribe(keys => {
      this.inactiveKeys = [];
      console.log(keys);
      for (const key of keys) {
        this.inactiveKeys.push(key.value);
      }
      console.log(this.inactiveKeys);
    })
  }

  private isSpecialOrNormalKey(key: string): "SPECIAL" | "NORMAL" | false {
    const isAllowedSpecialKey = [
      "ENTER", "BACKSPACE", "ARROWRIGHT", "ARROWLEFT"
    ].includes(key);
    const isAlphabetical = key.match(/[a-zA-Z]/g) && key.length === 1;

    if (isAllowedSpecialKey) {
      return "SPECIAL";
    } else if (isAlphabetical) {
      return "NORMAL";
    }
    return false;
  }

  write($event: MouseEvent | TouchEvent) {
    const element = $event.currentTarget as HTMLElement;
    const keyType = this.isSpecialOrNormalKey(element.name);
    if (keyType !== false) {
      this.keyboardService.send({
        value: element.name,
        type: keyType
      });
    }
  }
}
