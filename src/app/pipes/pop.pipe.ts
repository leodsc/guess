import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pop'
})
export class PopPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string | number {
    console.log(value.at(args[0]));
    return value.at(args[0])!;
  }

}
