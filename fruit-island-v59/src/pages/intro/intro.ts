import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
// import { VoiceService } from './../../services/voice-service';

import { Stage1 } from '../stage-1/stage-1';

/**
 * Generated class for the Intro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  // providers: [
  //   VoiceService
  // ]
})
export class Intro {

  constructor( private androidFullScreen: AndroidFullScreen, public navCtrl: NavController, public navParams: NavParams) {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Intro');
  }

  async pressEvent() {
    console.log('Pressed!');
    this.navCtrl.push(HomePage);
//    this.listenForSpeech();
  }


}