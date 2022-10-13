import {Status} from "src/app/types/term";

export class Word {
  private readonly _value: string[];
  static readonly target: string = "TENSO";
  rightLetters: Status[] = [];
  targetTokens: {};
  wordTokens: {};

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
  
  private tokenize(word: string[], count: boolean) {
    return word.reduce((acc, current) => {
      //@ts-ignore
      const numberOfTimes = acc[current];
      if (count && numberOfTimes !== undefined) {
        return {...acc, [current]: numberOfTimes+1}
      } else if (count && numberOfTimes === undefined) {
        return {...acc, [current]: 1};
      }
      return {...acc, [current]: { count: 0, status: [] }}
    }, {})
  }

  compare() {
    const targetArr = Word.target.split("");
    this.targetTokens = this.tokenize(targetArr, true);
    this.wordTokens = this.tokenize(this._value, false);

    for (const [index, letter] of this._value.entries()) {
      //@ts-ignore
      this.wordTokens[letter].count += 1;
      if (letter === targetArr[index]) {
        this.rightLetters[index] = "RIGHT";
        //@ts-ignore
        this.wordTokens[letter].status.push("RIGHT");
      } else if (this.isLetterOutOfOrder(letter)) {
        this.rightLetters[index] = "SEMI";
        //@ts-ignore
        this.wordTokens[letter].status.push("SEMI");
      } else {
        //@ts-ignore
        this.wordTokens[letter].status.push("WRONG");
        this.rightLetters[index] = "WRONG";
      }
    }
    console.log(this.wordTokens);
  }

  isBlockEmpty(index: number) {
    return this._value[index] === "";
  }

  erase(index: number) {
    this._value[index] = "";
  }

  isRight() {
    return this.rightLetters.every((value) => value === "RIGHT");
  }

  private isLetterOutOfOrder(letter: string) {
    //@ts-ignore
    const letterDontExistOnTarget = this.targetTokens[letter] === undefined;
    //@ts-ignore
    const letterIsOutOfOrder = this.wordTokens[letter].count <= this.targetTokens[letter];
    if (letterDontExistOnTarget) {
      return false;
    } else if (letterIsOutOfOrder) {
      return true;
    }
    return false;
  }
}
