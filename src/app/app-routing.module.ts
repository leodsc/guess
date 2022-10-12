import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { GamesComponent } from './pages/games/games.component';
import {SimpleGameComponent} from './pages/games/simple-game/simple-game.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "games", 
    children: [
      { path: "", component: GamesComponent, title: "Games" },
      { path: "simple", component: SimpleGameComponent, title: "Simple term" },
    ]
  },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
