import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BingoService } from '../bingo.service';

@Component({
  selector: 'app-show-numbers',
  templateUrl: './show-numbers.component.html',
  styleUrls: ['./show-numbers.component.scss']
})
export class ShowNumbersComponent implements OnInit {


  constructor(private bingoService: BingoService) { }

  // Subscriptions
  bingoNumbers$: Subscription;
  lastNumber$: Subscription;

  // Aditional Info
  latestNumber: number;

  ngOnInit() {
    this.bingoNumbers$ = this.bingoService.bingoNumbersAsObservable().subscribe( (info: any) => {
      this.latestNumber = info;
    });

    this.lastNumber$ = this.bingoService.lastNumberAsObservable().subscribe( (info) => {
      console.log('Last Number ' + info);
    });

    this.bingoService.startBingo();
  }

  ngOnDestroy(): void {
    // In Order to avoid memory leaks
    if (this.bingoNumbers$) { this.bingoNumbers$.unsubscribe(); }
    if (this.lastNumber$) { this.lastNumber$.unsubscribe(); }
  }

}
