import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Key} from '../types/term';

type Action = {
  press: BehaviorSubject<Key>,
  inactive: BehaviorSubject<Key[]>
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  private action: Action = {
    press: new BehaviorSubject<Key>({value: "", type: "NORMAL"}),
    inactive: new BehaviorSubject<Key[]>([])
  }
  keyPressObservable = this.action.press.asObservable();
  inactiveKeysObservable = this.action.inactive.asObservable();

  constructor() { }

  send(key: Key) {
    this.action.press.next(key);
  }

  addInactive(key: string) {
    this.inactiveKeys.push({
      value: key,
      type: "NORMAL"
    })
    this.action.inactive.next(this.inactiveKeys);
  }

  get inactiveKeys() {
    return this.action.inactive.value;
  }
}
