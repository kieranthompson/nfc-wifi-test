import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NfcreceiverPage } from './nfcreceiver';

@NgModule({
  declarations: [
    NfcreceiverPage,
  ],
  imports: [
    IonicPageModule.forChild(NfcreceiverPage),
  ],
})
export class NfcreceiverPageModule {}
