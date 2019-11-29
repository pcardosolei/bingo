import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, timer } from 'rxjs';
import { map, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  // Info for the "players"
  protected lastNumber$ = new BehaviorSubject(-1);
  protected bingoNumbers$ = new ReplaySubject(5);

  // the numbers that will be drawn
  bingoStructure: Array<number>;

  // flag when someone has a bingo
  unsubscribe$ = new Subject();

  constructor() { }

  startBingo() {
    const bingoDraw = timer(0, 2000).pipe( map( () => this.drawNumber()) , takeUntil(this.unsubscribe$)).subscribe(
      (newNumber: number) => {
        this.populateSubjects(newNumber);
      }
    );
  }

  // reset the bingo
  resetBingo() {
    this.bingoStructure = [...Array(75).keys()];
    this.unsubscribe$ = new Subject();
  }

  // draw a number
  drawNumber() {
    // no more balls left to draw
    if (this.bingoStructure.length === 0) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      return;
    }

    // draw one ball and show it to the players.
    const drawIndex = Math.random() * this.bingoStructure.length;
    const drawnNumber = this.bingoStructure.splice(drawIndex, 1);
    return drawnNumber[0];
  }

  // populate Subjects
  populateSubjects(drawnValue: number) {
    this.bingoNumbers$.next(drawnValue);
    this.lastNumber$.next(drawnValue);
  }

  // someone made BINGO!!!!
  bingo() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /* Observers */
  lastNumberAsObservable() {
    return this.lastNumber$.asObservable();
  }

  bingoNumbersAsObservable() {
    return this.bingoNumbers$.asObservable();
  }
}
