import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-final',
  templateUrl: 'final.html'
})
export class Final {
  constructor(private nativeAudio: NativeAudio,public events: Events) {
    this.nativeAudio.preloadSimple('final', 'assets/sounds/final.mp3')
    .then(() => {
      this.nativeAudio.play('final');
    });
  }

  nextCommand = null;

  handleClick(command) {
    //this.events.publish('command:new', {value: command});

  }

  handleGameStart() {

//    this.nativeAudio.play('begin');
    console.log('Game start!');
  }
}
