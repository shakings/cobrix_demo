import {Component, ComponentRef, Input, OnDestroy, ViewChild} from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import {Events} from "ionic-angular";

@Component({
  selector: 'game',
  templateUrl: 'game.html'
})
export class Game implements OnDestroy{
  ngOnDestroy(): void {
    this.showChild = false;

    this.events.unsubscribe('command:new');
    this.events.unsubscribe('command:handled');
  }

  @Input() gameMap;
  
  @Input() width = 640;
  @Input() height = 360;

  direction = 1;
  monkeyY = 0;
  monkeyX = 0;
  dotWidth = 0;

  gameState = 'wait' // wait|before|doing|after
  gameStateCause = '';

  canHandleCommand = {value: true};

  showChild = true;


  constructor(private androidFullScreen: AndroidFullScreen, private events: Events) {
//    this.height = this.width/16*9;
    events.subscribe('command:new', (command) => {
      if( !this.canHandleCommand.value ) return;

      this.handleCommand(command.value);

      this.canHandleCommand = {value: false};
    });

    events.subscribe('command:handled', () => {
      this.canHandleCommand = {value: true};

      this.checkGameStatus();
    })
  }

  ngOnChanges() {
    this.dotWidth = this.width/16;
    this.update();
  }

  update() {
    this.initMonkey();
  }

  checkGameStatus() {
    const { monkeyY, monkeyX, gameMap, events } = this;

    console.log(monkeyY, monkeyX, gameMap, events);

    if( gameMap[monkeyY][monkeyX] === 3 ) { // reach to apple
      events.publish('game:ended', 'success');

      this.gameState = 'after';
      this.gameStateCause = 'success';
    }

    if( gameMap[monkeyY][monkeyX] === 4 ) { // reach to ghost
      events.publish('game:ended', 'failed');

      this.gameState = 'after';
      this.gameStateCause = 'failed';
    }
  }

  getTop(rowIdx) {
    const { width } = this;

    const marginTop = width/16;
    const dotWidth = width/16;
    const spaceTop = width/16;

    return marginTop+rowIdx*(dotWidth+spaceTop);
  }

  getLeft(colIdx) {
    const { width } = this;

    const dotWidth = width/16;
    const marginLeft = width/32*5;
    const spaceLeft = width/16;

    return marginLeft+colIdx*(dotWidth+spaceLeft);
  }

  handleCommand(command) {
    if( command !== 0 ) {
      this.direction += command;
    }

    else {
      const com = (this.direction%4+4)%4;
      const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

      const nextY = this.monkeyY+dir[com][0];
      const nextX = this.monkeyX+dir[com][1];

      if( ( 0 <= nextY && nextY < this.gameMap.length ) &&
        ( 0 <= nextX && nextX < this.gameMap[0].length ) ) {
        this.monkeyY = nextY;
        this.monkeyX = nextX;
      }
    }
  }

  initMonkey() {
    const { gameMap } = this;

    this.direction = 1;

    for(let i = 0 ; i < gameMap.length ; i++) {
      for(let j = 0 ; j < gameMap[i].length ; j++) {
        if( gameMap[i][j] === 2 ) {
          this.monkeyY = i;
          this.monkeyX = j;
        }
      }
    }
  }

  handleClickStart() {
    this.gameState = 'doing';
    this.events.publish('game:started');
  }
}
