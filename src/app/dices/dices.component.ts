import { Component, OnInit, } from '@angular/core';
import { NbDboardService } from '../data-nb-d-board.service';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.css']
})
export class DicesComponent implements OnInit {

  diceSpin;
  constructor(private nbDboardservice:NbDboardService) { };
  getData():void{
  this.nbDboardservice.getnbDboardData()

  }
  ngOnInit() {
    this.getData();
  }





//derniere parenthèse
}
