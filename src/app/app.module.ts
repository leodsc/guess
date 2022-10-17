import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GamesComponent } from './pages/games/games.component';
import { AboutComponent } from './pages/about/about.component';
import { SimpleGameComponent } from './pages/games/simple-game/simple-game.component';
import { KeyboardComponent } from './common/keyboard/keyboard.component';
import { PopPipe } from './pipes/pop.pipe';
import { LengthPipe } from './pipes/length.pipe';
import { IsSpecialKeyPipe } from './pipes/is-special-key.pipe';
import { BoardComponent } from './common/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    GamesComponent,
    AboutComponent,
    SimpleGameComponent,
    KeyboardComponent,
    PopPipe,
    LengthPipe,
    IsSpecialKeyPipe,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
