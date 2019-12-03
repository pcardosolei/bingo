import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { BingoService } from 'src/app/bingo.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  // Subscription
  protected lastNumbers$: Subscription;

  // bingo card
  bingoCard: [][];
  drawnBingoNumbers = []; 

  // boolean 
  expert: boolean;

  constructor(private bingoService: BingoService){}

  ngOnInit(){
    this.createBingoCard();
    this.subLatest();
  }

  ngOnDestroy(){
    this.lastNumbers$.unsubscribe();
  }

  /* Player has bingo ! */
  notifyBingo(){
    this.bingoService.bingo(this.bingoCard);
  };

  /* 
    Logic behing the bingo card 
    This might be wrong
  */ 
  createBingoCard(){
    let columns = [];
    for(let i = 0; i < 5; i++){
      columns.push(this.getBingoRowNumbers(i));
    }

    this.bingoCard = columns;
  }
  
  /*
    add bingo row numbers.
    this can be done better
  */
  getBingoRowNumbers(index: number){
    let row = [];
    let minRange = (index == 0) ? 1 : (index * 15) + 1;
    let maxRange = (index + 1) * 15;
    
    // assignment
    let poolOfNumbers = [];
    for(minRange; minRange <= maxRange; minRange++){
      poolOfNumbers.push(minRange);
    }

    // Draw
    for(let i = 0; i < 5; i++){
      let drawIndex = Math.random() * poolOfNumbers.length;
      const drawnNumber = poolOfNumbers.splice(drawIndex, 1);
      row.push({number: drawnNumber, active: false});
    } 
  
    return row;
  }

  unsubLatest(){
    this.lastNumbers$.unsubscribe();
    this.expert = true;
  }

  subLatest(){
    this.expert = false;
    this.lastNumbers$ = this.bingoService.bingoNumbersAsObservable().subscribe( (info: number) => {
      if(info === -1){ this.drawnBingoNumbers = [];}
      else{
        if(this.drawnBingoNumbers.length === 5){
          this.drawnBingoNumbers.shift();
        }
        this.drawnBingoNumbers.push(info);
      }
    });
  }
}
