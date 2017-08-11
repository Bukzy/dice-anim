import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';

import { NbDboardService } from '../data-nb-d-board.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  @Input() type;
  @Input() selectedDice;



  constructor (private nbDboardservice:NbDboardService) { };
  getData():void{
    this.nbDboardservice.getnbDboardData()
  }
  ngOnInit() {
    this.getData();
  }
  addDice(){
      this.nbDboardservice.nbDboard[this.type] ++
      this.nbDboardservice.changeRollButtonState();
  }

  removeDice(){
    if (this.nbDboardservice.nbDboard[this.type]>0 )
    this.nbDboardservice.nbDboard[this.type] --

  }


}
