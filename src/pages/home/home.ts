import { WifilistPage } from './../wifilist/wifilist';
import { NfcreceiverPage } from './../nfcreceiver/nfcreceiver';
import { Component } from '@angular/core';
import { NavController, AlertController, Platform, NavParams } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ssid: string;
  password: string;
  constructor(private navParams: NavParams, private hotspot: Hotspot, private androidfingerprintauth: AndroidFingerprintAuth, public platform: Platform, public navCtrl: NavController, private nfc: NFC, private ndef: Ndef, private alertCtrl: AlertController) { 
    this.nfc = nfc;
    this.ndef = ndef;

    this.platform.ready().then(() => {
      this.addNFCListener(); 
      this.addFingerprintListener();
    });
  }

  connectToNetwork(): void {
    this.ssid = this.navParams.get('ssid');
    this.password = this.navParams.get('password');
    this.hotspot.connectToWifi(this.ssid, this.password);
  }

  wifiListPage() {
    this.navCtrl.setRoot(WifilistPage);
  }

  addFingerprintListener(): void {
    this.androidfingerprintauth.isAvailable()
    .then((result) => {
      if(result.isAvailable) { 
        this.androidfingerprintauth.encrypt({ clientId: 'nfc-test', username: 'kieran', password: 'password'})
        .then(result => {
          if(result.withFingerprint) {
            this.alertCtrl.create({
              title: 'successfully encrypted details',
              subTitle: 'Encrypted credentials: ' + result.token,
              buttons: ['ok']
            }).present();
            this.connectToNetwork();
          }else if (result.withBackup) {
            this.alertCtrl.create({
              title: 'Successfully authenticated with backup password',
              buttons: ['ok']
            }).present();
          } else {
            this.alertCtrl.create({
              title: 'couldnt authenticate',
              buttons: ['ok']
            }).present();
          }
        }).catch(err => {
          if(err === this.androidfingerprintauth.ERRORS.FINGERPRINT_CANCELLED) {
            this.alertCtrl.create({
              title: 'Fingerprint authentication failed',
              buttons: ['ok']
            }).present();
          }
        })
      } else {
        this.alertCtrl.create({
          title: 'Fingerprint not available',
          buttons: ['ok']
        }).present();

        this.navCtrl.setRoot(NfcreceiverPage);
      }
    })
  }

  addNFCListener(): void {
    this.nfc.addNdefListener(() => {
      this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Ndef listener attached',
        buttons: ['ok']
      }).present();
    }, (err) => {
      this.alertCtrl.create({
        title: 'Failure',
        subTitle: 'Failed to attach Ndef Listener',
        buttons: ['ok']
      }).present();
    }).subscribe((event) => {
      this.alertCtrl.create({
        title: 'Tag Discovered',
        subTitle: 'Message: ' + event.tag.ndefMessage,
        buttons: ['ok']
      }).present();

      let message = this.ndef.textRecord('Hello World', null, null);
      this.nfc.share([message]).then(() => {
        this.alertCtrl.create({
          title: 'success',
          subTitle: 'message sent successfully',
          buttons: ['ok']
        })
      }).catch((err) => {
        this.alertCtrl.create({
          title: 'failed',
          subTitle: 'could not send message',
          buttons: ['ok']
        })
      })
    });
  }
}
