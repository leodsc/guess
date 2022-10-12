import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-game',
  templateUrl: './simple-game.component.html',
  styleUrls: ['./simple-game.component.scss']
})

export class SimpleGameComponent implements OnInit {

  // bugs: cor vermelha mudando quando a tentativa é aumentada
  // bug: é possível fazer nova tentativa sem preencher todos os blocos

  // [class.turn-around]="block.rightLetter[i] && t == this.block.current.y" 
  tentatives = Array(6).fill(0);
  letters = Array(5).fill(null);
  currentWord: string[] = [];
  currentTentative = 0;
  wordTarget = "TENSO";
  wordStack: string[] = [];
  word = {
    target: "TENSO",
    current: []
  }
  block = {
    current: {
      x: 0,
      y: 0,
    },
    rightLetter: Array(5).fill(false),
  }

  constructor() { }

  ngOnInit(): void {
  }

  showKey(key: string) {
    // trim to prevent mouse/touch click add a space in the letter
    this.currentWord[this.block.current.x] = key.trim();
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
    for (const [index, letter] of this.currentWord.entries()) {
      if (letter === this.wordTarget[index]) {
        this.block.rightLetter[index] = true;
      }
    }
    const rightAnswer = this.currentWord.join("") === this.wordTarget;
    if (rightAnswer) {
      return;
    } else {
      console.log(this.wordStack);
      this.wordStack.push(this.currentWord.join(""));
      this.currentWord = [];
      this.block.current.x = 0;
      this.block.current.y += 1;
      this.currentTentative += 1;
    }
  }
}
