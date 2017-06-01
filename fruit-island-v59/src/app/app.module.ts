import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TextToSpeech } from '@ionic-native/text-to-speech'
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AlertController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { VoiceService } from '../providers/voice-service';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Intro } from '../pages/intro/intro';
import { Final } from '../pages/final/final';
import { Stage1 } from '../pages/stage-1/stage-1';
// import { HomePage } from '../pages/home/home';
import { Direction } from '../pages/home/direction.component';
import { Dot } from '../pages/home/dot.component';
import { Game } from '../pages/home/game.component';
import {GameWrapper} from "../pages/home/gamewrapper.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Final,
    Intro,
    Stage1,
     Direction,
    Dot,
    Game,
    GameWrapper
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Final,
    HomePage,
    Intro,
    Stage1,
     Direction,
    Dot,
    Game,
    GameWrapper
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextToSpeech,
    SpeechRecognition,
    AlertController,
    AndroidFullScreen,
    VoiceService,
    NativeAudio,
    Vibration
  ]
})
export class AppModule {}
