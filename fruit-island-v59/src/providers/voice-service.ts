import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech'
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';
import { Injectable } from '@angular/core';

//to do : make voice assistant as a service
declare var ApiAIPlugin: any;

/**
 * Generated class for the Intro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Injectable()
export class VoiceService {

  text: string;
  speechList: Array<string> = [];
  messages: Array<object> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;
  textBody: string;
  voiceBody: string;
  alternate: boolean;
  hideTime: boolean;
  verbalResponse: boolean;
  newMessage: {};
  responseMessage: {};

  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, public platform: Platform) {

    this.checkSpeechPermissions();

    ApiAIPlugin.init(
      {
        clientAccessToken: "908415e3087c4a66afe961857aca8099", // insert your client access key here 
        lang: "en" // set lang tag from list of supported languages 
      },
      function (result) { /* success processing */ },
      function (error) { /* error processing */ }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Intro');
  }

  // Voice Assistant
  checkSpeechPermissions() {
    this.speech.isRecognitionAvailable()
      .then(available => {
        if (available) {
          this.speech.requestPermission()
            .catch(err => alert(err));
        } else {
          alert('Sorry speech recognition not available on this device');
        }
      });
  }


  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    }
    catch (e) {
      console.error(e)
    }
  }

  async isSpeechSupported(): Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  async SpeakText(voice): Promise<any> {
    try {
      await this.tts.speak(voice);
      console.log("Successfully spoke");
    }
    catch (e) {
      console.log(e);
    }
  }

  // pressEvent(e) {
  //   this.listenForSpeech();
  // }

  async listenForSpeech(): Promise<any> {
    this.androidOptions = {
      language: 'en-US',
      prompt: 'Speak into your phone!',
      matches: 1,
      showPopup: false
    };

    this.iosOptions = {
      language: 'en-US',
      matches: 1
    };
    // to do : 먼저 prompt가 나온 후에 유저가 말을 하면 prompt 박스가 사라지기
    // alternative : 구글 default voice prompt 사용
    // presentPrompt(){
    //   let alert = this.alertCtrl.create({

    //   });
    //   alert.present();
    // }

    //this.presentPrompt();

    // to do : 먼저 tts 재생 후 1초 후 음성 인식이 activation
    // 현재 상태 : tts와 음성 인식이 같이 activation이 된다
    await this.SpeakText("What can I do for you");

    // 이렇게 하면 두번째 인식 때 인식이 잘 되지 않는다 
    // setTimeout(function () {
    //   console.log('xyz')
    // }, 1500)

    if (this.platform.is('android')) {
      // setTimeout(function(){this.SpeakText("What can I do for you")},1000);
      // setTimeout(function () {
      //   this.speech.startListening(this.androidOptions).subscribe(
      //     (data) => {
      //       this.SendTextFromVoice(data)
      //     }, (error) => {
      //       console.log(error)
      //     })
      // }, 1000);

      return new Promise((resolve, reject) => {
        this.speech.startListening(this.androidOptions).subscribe(
          async (data) => {
            const action = await this.SendTextFromVoice(data);

            resolve(action);
            //Question
            //return this.SendTextFromVoice(data);

          }, (error) => {
            reject(error);
            console.log(error);
          }
        );
      });


    }
    else if (this.platform.is('ios')) {
      this.speech.startListening(this.iosOptions).subscribe(data => this.speechList = data, error => console.log(error));
      console.log(this.speechList);
    }

  }
  picture() {

  }

  run() {

  }
  async SendTextFromVoice(query): Promise<any> {
    return new Promise((resolve, reject) => {
      ApiAIPlugin.requestText(
        {
          query
        },
        (response) => {
          if (response.result.fulfillment.speech) {
            let voice = response.result.fulfillment.speech;
            console.log('3', voice);
            this.SpeakText(voice).then(() => {
              resolve(response.result.action);
            })

            //Question
            //return response.result.action;
            //alert(response.result.action);
            // to do 
            // receive the result in a format that could be easily usable target for the navigation
            // if () { this.navCtrl.push(stage-1) } 

          } else {
            let voice = "I'm sorry. I could not find an answer to that request."
            console.log('3', voice);
            this.SpeakText(voice).then(() => {
              resolve('');
            });
          }
        },
        (error) => {
          reject(error);
          console.error(error);
        });
      // })
      // const response = await ApiAIPlugin.requestText({query});

      // alert(response);

      // if (response.result.fulfillment.speech) {
      //     let voice = response.result.fulfillment.speech;
      //     console.log('3', voice);
      //     await this.SpeakText(voice);

      //     //Question
      //     return response.result.action;
      //     //alert(response.result.action);
      //     // to do 
      //     // receive the result in a format that could be easily usable target for the navigation
      //     // if () { this.navCtrl.push(stage-1) } 

      //   } else {
      //     let voice = "I'm sorry. I could not find an answer to that request."
      //     console.log('3', voice);
      //     await this.SpeakText(voice);

      //     return null;
      //   }

      // await ApiAIPlugin.requestText(
      //   {
      //     query
      //   },
      //   (response) => {
      //     if (response.result.fulfillment.speech) {
      //       let voice = response.result.fulfillment.speech;
      //       console.log('3', voice);
      //       this.SpeakText(voice);

      //       //Question
      //       //return response.result.action;
      //       //alert(response.result.action);
      //       // to do 
      //       // receive the result in a format that could be easily usable target for the navigation
      //       // if () { this.navCtrl.push(stage-1) } 

      //     } else {
      //       let voice = "I'm sorry. I could not find an answer to that request."
      //       console.log('3', voice);
      //       this.SpeakText(voice);
      //     }
      //   },
      //   (error) => {
      //     console.error(error);
      //   });
      // } catch (e) {
      //   alert(e);
      // }
    
    });
  }
}
