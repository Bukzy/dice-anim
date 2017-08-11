import { Component, OnInit, Input} from '@angular/core';


import { NbDboardService } from '../data-nb-d-board.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() dataResult;


  constructor(private nbDboardservice:NbDboardService) { };
  getData():void{
    this.nbDboardservice.getnbDboardData()
  }
  ngOnInit() {
    this.getData();
  }




}
