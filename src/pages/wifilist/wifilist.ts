import { HomePage } from './../home/home';
  import { Component, Injectable } from '@angular/core';
  import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
  import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
  import { WifiCredentials } from '../../app/wificredentials';

  /**
   * Generated class for the WifilistPage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */

  @IonicPage()
  @Component({
    selector: 'page-wifilist',
    templateUrl: 'wifilist.html',
  })
  export class WifilistPage {

    networks: any;
    wifiCredentials = new WifiCredentials();
    constructor(public hotspot: Hotspot, public toast: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
      this.wifiCredentials.ssid = '';
      this.wifiCredentials.password = '';
    }

    ionViewDidLoad() {
      this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
        this.networks = networks;
      });
      console.log('ionViewDidLoad WifilistPage');
    }

    toasttest() {
      this.toast.create({
        message: 'hello test',
        duration: 3000,
        position: 'bottom'
      }).present();
    }

    setWifiCredentials(ssid: string) { 
      this.wifiCredentials.ssid = ssid;
      this.alertCtrl.create({
        title: 'Wifi Credentials',
        subTitle: 'Enter password for ' + ssid,
        inputs: [
          {
            name: 'password',
            placeholder: 'password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'cancel',
            role: 'cancel'
          },
          {
            text: 'connect',
            handler: data => {
              this.wifiCredentials.password = data.password;
              this.alertCtrl.create({
                title: this.wifiCredentials.ssid + ' ' + this.wifiCredentials.password,
                buttons: ['ok']
              }).present();
              this.navCtrl.setRoot(HomePage, {
                ssid: this.wifiCredentials.ssid,
                password: this.wifiCredentials.password
              });
            }
          }
        ]
      }).present();

     
    }

  }
