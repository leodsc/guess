import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSymbol'
})
export class IsSymbolPipe implements PipeTransform {

  transform(value: string | Symbol, ...args: unknown[]): unknown {
    if (typeof value === 'symbol') {
      return "";
    }
    return value;
  }

}
