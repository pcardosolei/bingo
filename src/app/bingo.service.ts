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
  protected bingoStructure: Array<number>;

  // flag when someone has a bingo
  protected unsubscribe$ = new Subject();

  constructor() { }

  public startBingo() {
    // lets reset bingo before we begin;
    this.resetBingo();

    // logic for the draw a ball on bingo
    const bingoDraw = timer(0, 500).pipe( map( () => this.drawNumber()) , takeUntil(this.unsubscribe$)).subscribe(
      (newNumber: number) => {
        this.populateSubjects(newNumber);
      }, (error) => { 
        console.log(error);
      }, () => { 
        // lets reset bingo. it just keeps going 
        console.log('Lets get all the balls again and start a new BINGO GAME')
        this.startBingo(); 
      });
  }

  // reset the bingo
  private resetBingo() {
    this.bingoStructure = Array.from({length: 75}, (v,k) => k+1);
    this.unsubscribe$ = new Subject();
  }

  // draw a number
  private drawNumber() {
    // no more balls left to draw
    if (this.bingoStructure.length === 0) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.populateSubjects(-1);
      return;
    }

    // draw one ball and show it to the players.
    const drawIndex = Math.random() * this.bingoStructure.length;
    const drawnNumber = this.bingoStructure.splice(drawIndex, 1);
    return drawnNumber[0];
  }

  // populate Subjects
  private populateSubjects(drawnValue: number) {
    this.bingoNumbers$.next(drawnValue);
    this.lastNumber$.next(drawnValue);
  }

  // someone made BINGO!!!!
  public bingo() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /* Observers */
  public lastNumberAsObservable() {
    return this.lastNumber$.asObservable();
  }

  public bingoNumbersAsObservable() {
    return this.bingoNumbers$.asObservable();
  }
}
