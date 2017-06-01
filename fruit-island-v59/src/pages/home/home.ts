import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  height =0;
  width =0;

  constructor( private nativeAudio: NativeAudio,public events: Events) {


    this.events = events;
//    this.nativeAudio.preloadSimple('begin', 'assets/sounds/monkey.wav').then();

    events.subscribe('game:started', () => {
      this.handleGameStart();
    });

    events.subscribe('dot:touched', (type, row, col) => {
      console.log('touched!! ', type, row, col);
    })
  }

  nextCommand = null;

  handleClick(command) {
    //this.events.publish('command:new', {value: command});

    this.events.publish('command:new', {value: 0});
  }

  handleGameStart() {

//    this.nativeAudio.play('begin');
    console.log('Game start!');
  }
}
