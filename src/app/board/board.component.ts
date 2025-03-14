import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  showPopup: boolean = false;
  isTie:boolean;

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.showPopup =false;
    this.isTie = false;
  }

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  get player(){
    return this.xIsNext ? 'X' : 'O'
  }

  makeMove(idx: number){
    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    if (!this.winner && !this.squares.includes(null)) {
      this.isTie = true; 
    }

    this.showPopup = !!this.winner || this.isTie;

  }

  calculateWinner(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i=0; i< lines.length; i++){
      const [a,b,c] = lines[i];
      if(this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c] ){
        return this.squares[a]
      }
    }
    return null;
  }

  closePopup() {
    this.showPopup = false;
    this.newGame();
  }

}
