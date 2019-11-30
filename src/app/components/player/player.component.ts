import { Component } from '@angular/core';
import { BingoService } from 'src/app/bingo.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor(private bingoService: BingoService){}

  notifyBingo(){
    this.bingoService.bingo();
  };

  createBingoCard(){
    let columns = new Array(6);
    // TODO finish this
  };  
}
