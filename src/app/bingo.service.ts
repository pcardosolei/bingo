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

  // checking if a player made bingo
  protected checking = false;

  constructor() { }

  public startBingo() {
    // lets reset bingo before we begin;
    this.resetBingo();

    // logic for the draw a ball on bingo
    const bingoDraw = timer(0, 1000).pipe( map( () => this.drawNumber()) , takeUntil(this.unsubscribe$)).subscribe(
      (newNumber: number) => {
        this.populateSubjects(newNumber);
      }, (error) => { 
        console.log(error);
      }, () => { 
        // lets reset bingo. it just keeps going 
        console.log('BINGO GAME is over');
      });
  }

  // reset the bingo
  private resetBingo() {
    this.bingoStructure = Array.from({length: 75}, (v,k) => k+1);
    this.unsubscribe$ = new Subject();
  }

  // draw a number
  private drawNumber() {
    // is checking if the player has BINGO
    if(this.checking){ return; }

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
  public bingo(playerBingoCard) {
    this.checking = true;
    if(this.checkingPlayerCard(playerBingoCard) === true){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      alert('You Made Bingo');
    } else {
      alert('Nope. no Bingo for you');
    }
    this.checking = false;
  }

  // checks if the player won
  public checkingPlayerCard(playerBingoCard){
    for(let row of playerBingoCard){
      for(let column of row){
        for(let number of this.bingoStructure){
          if(number == column.number){ return false; }
        }
      }
    }
    return true;
  }

  /* Observers */
  public lastNumberAsObservable() {
    return this.lastNumber$.asObservable();
  }

  public bingoNumbersAsObservable() {
    return this.bingoNumbers$.asObservable();
  }
}
