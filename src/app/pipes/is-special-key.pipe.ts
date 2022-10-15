import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSpecialKey'
})
export class IsSpecialKeyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value === "ENTER") {
      return `<fa-icon [icon]="teste"></fa-icon>`;
    } else if (value === "BACKSPACE") {
      return `<fa-icon [icon]="teste">h</fa-icon>`;
    }
    return `<p>${value}</p>`;
  }

}
