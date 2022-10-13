import { Component, OnInit } from '@angular/core';
import {Word} from '../classes/word';

@Component({
  selector: 'app-simple-game',
  templateUrl: './simple-game.component.html',
  styleUrls: ['./simple-game.component.scss']
})

export class SimpleGameComponent implements OnInit {

  // bug: é possível fazer nova tentativa sem preencher todos os blocos

  readonly tentatives = Array(6).fill(0).map(() => {
    return new Word(5);
  })
  currentTentative = 0;
  word: Word = this.tentatives[this.currentTentative];
  wordStack: string[] = [];
  block = {
    current: {
      x: 0,
      y: 0,
    },
    back: function() {
      if (this.current.x > 0) {
        this.current.x -= 1;
      }
    },
    next: function () {
      if (this.current.x < 4) {
        this.current.x += 1;
      }
    },
    reset: function() {
      this.current.x = 0;
      this.current.y += 1;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  showKey(key: string) {
    // trim to prevent mouse/touch click add a space in the letter
    this.word.add(this.block.current.x, key.trim());
    if (this.block.current.x < 4) {
      this.block.current.x += 1;
    }
  }

  changeCurrentLetterBox(index: number) {
    this.block.current.x = index;
  }

  handleSpecialKey(key: string) {
    if (key === "ENTER") {
      this.word.compare();
      if (this.word.isRight()) {
        return;
      } else {
        this.wordStack.push(this.word.value.join(""));
        this.block.reset();
        this.currentTentative += 1;
        this.word = this.tentatives[this.currentTentative];
      }
    } else if (key === "BACKSPACE" || key === "ARROWLEFT") {
      this.block.back();
    } else {
      this.block.next();
    }
  }
}
