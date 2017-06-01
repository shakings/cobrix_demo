import { Component } from "@angular/core";

import stage1 from './stage1.json';
import stage2 from './stage2.json';
import stage3 from './stage3.json';
import stage4 from './stage4.json';
import { Events } from "ionic-angular";
import { NativeAudio } from '@ionic-native/native-audio';
import { VoiceService } from '../../providers/voice-service';
import { Vibration } from '@ionic-native/vibration';
import { Final } from '../final/final';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NavController } from 'ionic-angular';
import { Http,Headers,URLSearchParams  } from '@angular/http';

declare var CameraPreview:any;

@Component(
  {
    selector: 'game-wrapper',
    templateUrl: 'gamewrapper.html',
  }
)


export class GameWrapper {
  stage = 1;
  phase = 'wait';
  result = '';
  switch = 0;
  height =0;
  width =0;
  body;
  headers = new Headers();
  imgData;

  gameMaps = [];
  commands = [];

  constructor(private http: Http, private androidFullScreen: AndroidFullScreen, public navCtrl: NavController, private vibration: Vibration, private voice: VoiceService, private nativeAudio: NativeAudio, public events: Events) {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => {
        return this.androidFullScreen.immersiveMode();
      })
      .then(() => {
        return this.androidFullScreen.immersiveWidth();
      })
      .then((width) => {
        return this.androidFullScreen.immersiveHeight().then((height) => {
          return {height, width};
        })
      })
      .then(({height, width}) => {
        height /= window.devicePixelRatio;
        width /= window.devicePixelRatio;
        this.height = height;
        this.width = width;
        CameraPreview.startCamera({x: 0, y: 0, width: this.width, height: this.height,camera: CameraPreview.CAMERA_DIRECTION.BACK, toBack: false, previewDrag: false, tapPhoto: false},
        function(result) {
          setTimeout(()=>{ CameraPreview.hide();}, 1000)
        }, function(err) {
          alert(err);
        });

        
 
      })
      .catch((error: any) => console.log(error));

      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.voice.checkSpeechPermissions();
    this.nativeAudio.preloadSimple('begin', 'assets/sounds/begin.mp3').then(()=>{
        this.nativeAudio.play('begin');
    });
    this.nativeAudio.preloadSimple('monkey', 'assets/sounds/monkey.wav').then();
    this.nativeAudio.preloadSimple('obstacle', 'assets/sounds/obstacle.wav').then();
    this.nativeAudio.preloadSimple('obstacle2', 'assets/sounds/obstacle2.wav').then();
    this.nativeAudio.preloadSimple('fruit', 'assets/sounds/fruit.wav').then();
    this.nativeAudio.preloadSimple('success', 'assets/sounds/stage_clear.mp3').then();
    this.nativeAudio.preloadSimple('failed', 'assets/sounds/stage_tryagain.wav').then();
    
    
    this.gameMaps = [stage1, stage2, stage3, stage3.slice(), stage4];
    this.commands = [
      [{ value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 0 }, { value: -1 }, { value: 0 }, { value: 1 }, { value: 0 }],
      [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: -1 }, { value: 0 }],
      [{ value: 0 }, { value: 0 }, { value: 1 }, { value: 0 }, { value: 0 }, { value: 1 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 0 }, { value: -1 }, { value: 0 }, { value: 1 }, { value: 0 }, { value: -1 }, { value: 0 }, { value: 1 }, { value: 0 }, { value: -1 }, { value: 0 }]
    ];
 

    events.subscribe('game:ended', (cause) => {
      console.log(`Game ended by [${cause}]}`);
      this.phase = 'end';
      this.result = cause;
    });

    events.subscribe('dot:touched', (type) => {
      if (type == 2) {
        this.nativeAudio.play('monkey');
      }else if(type == 1){
        this.vibration.vibrate(1000);
      }else if(type == 0){
      }else if(type == 3){
          this.nativeAudio.play('fruit');
      }else if(type == 4){
        if(this.switch == 0){
          this.nativeAudio.play('obstacle');
        }else{
          this.nativeAudio.play('obstacle2');
        }
        this.switch = 1- this.switch;
      }
    });
  }

  init() {
    this.phase = 'wait';
  }

  handleStageAndPhase() {
    if (this.phase === 'listen') {
      let index = 0;

      let clear = setInterval(() => {
        if (index === this.commands[this.stage - 1].length) {
          clearInterval(clear);
          if(this.result == 'success'){
            this.nativeAudio.play('success');
          }else if(this.result == 'failed'){
            this.nativeAudio.play('failed');
          }
          this.phase = 'end';

          return;
        }

        this.events.publish('command:new', this.commands[this.stage - 1][index++]);
      }, 1500);
    }

    if (this.phase === 'end') {

      if (this.stage < this.gameMaps.length) {
        this.stage++;
        this.init();
      }else{
        this.navCtrl.push(Final);
      }
    }
  }

  async handlePress() {

    if( this.phase === 'wait' ) {
      await this.voice.listenForSpeech();

      try {
        this.imgData = await new Promise((resolve, reject) => {
//          alert('Start taking a picture.');
          CameraPreview.takePicture((imgData) => {
            resolve(imgData);
          }, (err) => {
            reject(err);
          });
        });
      }
      catch(e) {
        alert(e);
        return;
      }

//      alert(this.imgData);
  
      this.phase = 'listen';
      //alert(this.phase);
    }

    else if( this.phase === 'listen' ) {
      await this.voice.listenForSpeech();   

      await this.assign();

//      let body = urlSearchParams.toString();

  

//      headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36');

//      alert(this.body);

      await this.http.post('http://52.187.18.221:3389/classify/api',this.body, {headers: this.headers})
          .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('call complete')          
          );


      this.handleStageAndPhase();
    }

    else {
      this.handleStageAndPhase();
    }


    
    
    console.log('pressed!');


    // if( this.phase === 'wait' ) {
    //   let index = 0;

    //   let clear = setInterval(() => {
    //     if( index === this.commands[this.stage-1].length ) {
    //       clearInterval(clear);
    //       this.phase = 'end';

    //       return;
    //     }

    //     this.events.publish('command:new', this.commands[this.stage-1][index++]);
    //   }, 1500);
    // }

    // if( this.phase === 'end' ) {
    //   if( this.stage < this.gameMaps.length ) {
    //     this.stage++;
    //     this.init();


  }

  assign()
  {
      this.body = "file="+this.imgData;
  }
}
  // }
// }
