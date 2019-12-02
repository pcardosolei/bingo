import { Component, OnInit } from '@angular/core';
import { BingoService } from './bingo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private bingoService: BingoService){}

  public playerActive = false;

  ngOnInit(): void {
    this.bingoService.startBingo();
  }

  addPlayer(): void {
    this.playerActive = !this.playerActive;
  }

  getButtonInfo(): String {
    return (this.playerActive) ? "Leave Bingo Stage" : "Start Playing Bingo!";
  }
}
