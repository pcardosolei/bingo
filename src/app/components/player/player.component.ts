import { Component, OnInit, OnDestroy } from '@angular/core';
import { BingoService } from 'src/app/bingo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor(private bingoService: BingoService) { }

  // Subscriptions
  bingoNumbers$: Subscription;
  lastNumber$: Subscription;

  ngOnInit() {
    this.bingoNumbers$ = this.bingoService.bingoNumbersAsObservable().subscribe( (info) => {
      console.log(info);
    });

    this.lastNumber$ = this.bingoService.lastNumberAsObservable().subscribe( (info) => {
      console.log('Last Number ' + info);
    });

    this.bingoService.resetBingo();
    this.bingoService.startBingo();
  }

  ngOnDestroy(): void {
    // In Order to avoid memory leaks
    if (this.bingoNumbers$) { this.bingoNumbers$.unsubscribe(); }
    if (this.lastNumber$) { this.lastNumber$.unsubscribe(); }
  }
}
