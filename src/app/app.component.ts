import { Component, OnInit } from '@angular/core';
import { BingoService } from './bingo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private bingoService: BingoService){}

  ngOnInit(): void {
    this.bingoService.startBingo();
  }
}
