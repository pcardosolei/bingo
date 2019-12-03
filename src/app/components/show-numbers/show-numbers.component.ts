import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BingoService } from 'src/app/bingo.service';

@Component({
  selector: 'app-show-numbers',
  templateUrl: './show-numbers.component.html',
  styleUrls: ['./show-numbers.component.scss']
})
export class ShowNumbersComponent implements OnInit {


  constructor(private bingoService: BingoService) { }

  // Subscriptions
  bingoNumbers$: Subscription;

  // Aditional Info
  latestNumber: number;
  numbersMissing: number;

  ngOnInit() {
    this.bingoNumbers$ = this.bingoService.lastNumberAsObservable().subscribe( (info: any) => {
      if(info === -1){
        this.numbersMissing = 75;
      } else {
        this.numbersMissing = this.numbersMissing - 1;
      } 
      this.latestNumber = info;
    });
  }

  ngOnDestroy(): void {
    // In Order to avoid memory leaks
    if (this.bingoNumbers$) { this.bingoNumbers$.unsubscribe(); }
  }

  restartBingo(): void{
    this.bingoService.startBingo();
  }
}
