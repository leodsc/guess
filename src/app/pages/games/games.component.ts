import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  name = "Simples";
  arrowBack = faArrowLeft;
  arrowNext = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
