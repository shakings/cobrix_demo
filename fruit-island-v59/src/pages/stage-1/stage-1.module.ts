import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Stage1 } from './stage-1';

@NgModule({
  declarations: [
    Stage1,
  ],
  imports: [
    IonicPageModule.forChild(Stage1),
  ],
  exports: [
    Stage1
  ]
})
export class Stage1Module {}
