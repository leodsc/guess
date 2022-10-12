import {Status} from "src/app/types/term";

export class Word {
  private _value: string[];
  static readonly target: string = "TENSO";
  rightLetters: Status[] = [];

  constructor(length: number) {
    // make api call
    this._value = Array(length).fill("");
  }

  get value(): string[] {
    return this._value;
  }

  add(index: number, letter: string) {
    this._value[index] = letter;
  }

  compare() {
    const targetArr = Word.target.split("");
    for (const [index, target] of this._value.entries()) {
      if (target === targetArr[index]) {
        this.rightLetters[index] = "RIGHT";
      } else if (this.matches(target)) {
        this.rightLetters[index] = "SEMI";
      } else {
        this.rightLetters[index] = "WRONG";
      }
    }
  }

  private matches(letter: string) {
    const numberOfOccurencesWord = this._value.filter((value) => value === letter);
    const numberOfOccurencesTarget = Word.target.split("").filter((value) => value === letter);
    return numberOfOccurencesTarget.length === numberOfOccurencesWord.length;
  }
}
