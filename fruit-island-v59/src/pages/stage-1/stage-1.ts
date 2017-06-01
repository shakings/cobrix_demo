import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Platform } from 'ionic-angular';
import { VoiceService } from '../../providers/voice-service';

/**
 * Generated class for the Intro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stage-1',
  templateUrl: 'stage-1.html',
  // providers: [
  //   VoiceService
  // ]
})
export class Stage1 {

  constructor(private voice: VoiceService, private androidFullScreen: AndroidFullScreen) {
    this.activateVoice();
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));

  }

  //action
  //if (action == ?) { }
  async pressEvent(e) {
    try {
      await this.voice.listenForSpeech();
      console.log('success');
    }
    catch(e) {

    }
    
    
}

  activateVoice() {
    this.voice.checkSpeechPermissions();
  }

}
