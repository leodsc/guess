import { Component, Input, OnInit } from '@angular/core';
import {Word} from '../classes/word';

@Component({
  selector: 'app-simple-game',
  templateUrl: './simple-game.component.html',
  styleUrls: ['./simple-game.component.scss']
})

export class SimpleGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
