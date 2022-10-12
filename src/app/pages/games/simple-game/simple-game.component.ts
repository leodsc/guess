import { Component, OnInit } from '@angular/core';
import {Word} from '../classes/word';

@Component({
  selector: 'app-simple-game',
  templateUrl: './simple-game.component.html',
  styleUrls: ['./simple-game.component.scss']
})

export class SimpleGameComponent implements OnInit {

  // bugs: cor vermelha mudando quando a tentativa é aumentada
  // bug: é possível fazer nova tentativa sem preencher todos os blocos

  readonly tentatives = Array(6).fill(0).map(() => {
    return new Word(5);
  })
  currentTentative = 0;

  wordTarget = "TENSO";
  wordStack: string[] = [];
  block = {
    current: {
      x: 0,
      y: 0,
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

  showKey(key: string) {
    const word = this.tentatives[this.currentTentative];
    // trim to prevent mouse/touch click add a space in the letter
    word.add(this.block.current.x, key.trim());
    if (this.block.current.x < 4) {
      this.block.current.x += 1;
    }
  }

  changeCurrentLetterBox(index: number) {
    this.block.current.x = index;
  }

  handleSpecialKey(key: string) {
    if (key === "ENTER") {
      this.isRightWord();
    }
  }

  private isRightWord() {
    const word = this.tentatives[this.currentTentative];
    word.compare();
    const rightAnswer = word.value.join("") === this.wordTarget;
    if (rightAnswer) {
      return;
    } else {
      this.wordStack.push(word.value.join(""));
      this.block.current.x = 0;
      this.block.current.y += 1;
      this.currentTentative += 1;
    }
  }
}
