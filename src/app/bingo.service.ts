import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  lastNumber$ = new BehaviorSubject(-1);
  bingoNumbers$ = new ReplaySubject(5);

  // the numbers that will be drawn
  bingoStructure: Array<number>;

  constructor() { }

  startBingo() {}

  // reset the bingo
  resetBingo() {
    this.bingoStructure = [...Array(75).keys()];
  }

  // draw a number
  drawNumber() {
    const drawIndex = Math.random() * this.bingoStructure.length;
    const drawnNumber = this.bingoStructure.splice(drawIndex, 1);
    return drawnNumber[0];
  }

  // populate Subjects
  populateSubjects(drawnValue: number) {
    this.bingoNumbers$.next(drawnValue);
    this.lastNumber$.next(drawnValue);
  }
}
