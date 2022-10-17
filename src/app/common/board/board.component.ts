import { Component, Input, OnInit } from '@angular/core';
import { Word } from 'src/app/pages/games/classes/word';
import {KeyboardService} from 'src/app/services/keyboard.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private keyboardService: KeyboardService) { }

  ngOnInit(): void {
    this.keyboardService.keyPressObservable.subscribe((key) => {
      key.type === "NORMAL" ?
        this.showKey(key.value) :
        this.handleSpecialKey(key.value);
    })
  }

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

  private addInactiveKeys() {
    for (const letter of this.word.value) {
      //@ts-ignore
      const letterExists = this.word.wordTokens[letter].status.some((value) => value !== "WRONG");
      const inactiveKeys = [];
      for (const key of this.keyboardService.inactiveKeys) {
        inactiveKeys.push(key.value);
      }
      const isActive = !inactiveKeys.includes(letter);
      if (!letterExists && isActive) {
        this.keyboardService.addInactive(letter);
      }
    }
  }

  showKey(key: string) {
    // trim to prevent mouse/touch click add a space in the letter
    key = key.trim();
    const isInactive = this.keyboardService.inactiveKeys.includes({
      value: key,
      type: "NORMAL"
    })
    if (isInactive || key === "") {
      return;
    }

    this.word.add(this.block.current.x, key);
    this.blockNextPosition(this.block.current.x, true);
  }

  private moveBlock() {
    if (this.block.current.x < 4) {
      this.block.current.x += 1;
    } else {
      this.block.current.x = 0;
    }
  }

  private blockNextPosition(initialBlockPosition: number, recursionStart: boolean) {
    const returnedToInitialBlock = initialBlockPosition === this.block.current.x && !recursionStart;
    if (returnedToInitialBlock) {
      if (initialBlockPosition !== 4) {
        this.moveBlock();
      }
      return;
    }

    this.moveBlock();
    const nextLetter = this.word.value[this.block.current.x];
    if (nextLetter === "") {
      return;
    } else {
      this.blockNextPosition(initialBlockPosition, false);
    }
  }

  changeCurrentLetterBox(index: number) {
    this.block.current.x = index;
  }

  handleSpecialKey(key: string) {
    if (key === "ENTER") {
      if (this.word.isAnyLetterEmpty()) {
        return;
      }

      this.word.compare();
      if (this.word.isRight()) {
        return;
      } else {
        this.addInactiveKeys();
        this.wordStack.push(this.word.value.join(""));
        this.block.reset();
        this.currentTentative += 1;
        this.word = this.tentatives[this.currentTentative];
      }
    } else if (key === "ARROWLEFT") {
      this.block.back();
    } else if (key === "BACKSPACE") {
      console.log("oi");
      if (this.word.isBlockEmpty(this.block.current.x)) {
        this.block.back();        
      }
      this.word.erase(this.block.current.x);
    } else {
      this.block.next();
    }
  }
}
