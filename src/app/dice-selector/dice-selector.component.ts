import { Component, OnInit, Input } from '@angular/core';

import { NbDboardService } from '../data-nb-d-board.service';

@Component({
  selector: 'app-dice-selector',
  templateUrl: './dice-selector.component.html',
  styleUrls: ['./dice-selector.component.css']
})
export class DiceSelectorComponent implements OnInit {

  selectedDice;

  constructor(private nbDboardservice:NbDboardService) { };
  getData():void{
    this.nbDboardservice.getnbDboardData()
  }
  ngOnInit() {
    this.getData();
  }

  onSelect(dice){
    this.selectedDice= dice;
  }


}
