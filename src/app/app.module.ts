import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Hotspot } from '@ionic-native/hotspot';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WifilistPage } from './../pages/wifilist/wifilist';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WifilistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WifilistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NFC,
    Ndef,
    AndroidFingerprintAuth,
    Hotspot,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
