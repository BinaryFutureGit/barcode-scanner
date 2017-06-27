import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScanResultPage } from '../scan-result/scan-result.ts';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  public scannedText: string;
  public buttonText: string;
  public loading: boolean;
  public eventTitle: string;
  private eventId: number;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    this.buttonText = 'Scan';
    this.loading = false;
  }

  public scanQR() {
    this.buttonText = 'Loading...';
    this.loading = true;

    this._barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log('User cancelled the action!');
        return false;
      }
      this.buttonText = 'Scan';
      this.loading = false;
      console.log('Scanned successfully!');
      this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }

  private goToResult(barcodeData) {
    this._nav.push(ScanResultPage, {
      scannedResult: barcodeData
    });
  }
}
