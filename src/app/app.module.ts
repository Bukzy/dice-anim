import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { DiceSelectorComponent } from './dice-selector/dice-selector.component';
import { DiceComponent } from './dice/dice.component';
import { NbDboardService } from './data-nb-d-board.service';
import { BoardComponent } from './board/board.component';
import { DicesComponent } from './dices/dices.component';
import { D4Component } from './dices/d4/d4.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceSelectorComponent,
    DiceComponent,
    BoardComponent,
    DicesComponent,
    D4Component
  ],
  imports: [
    BrowserModule,
    FormsModule,

  ],
  providers: [NbDboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
