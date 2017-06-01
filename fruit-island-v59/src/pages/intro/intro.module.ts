import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Intro } from './intro';
import { HomePage } from '../home/home';

@NgModule({
  declarations: [
    Intro,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(Intro),
  ], 
  exports: [
    Intro,
    HomePage
  ]
})
export class IntroModule {}
