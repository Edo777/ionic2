import {Component, ViewChild} from '@angular/core';
import {ViewController, NavController, LoadingController, NavParams} from "ionic-angular";

import {MapGoogle} from "../barrel";
import {TranslateService} from "../../translate/translate.service";

declare var google;

@Component({
  selector: 'add-address',
  templateUrl: 'add-address.html',
})
export class AddNewAddress {
  newAddress: any;
  addressForEdit: any;
  isEdit: boolean = false;
  @ViewChild('map') map: MapGoogle;

  constructor(private viewCtrl: ViewController,
              private nav: NavController,
              public loadingCtrl: LoadingController,
              private translateService: TranslateService,
              private params: NavParams) {
    if (this.params.data["address"]) {
      this.addressForEdit = this.params.data["address"];
      this.isEdit = true;

    }
  }

  ngOnInit() {
    this.presentLoadingDefault()
  }

  close() {
    this.viewCtrl.dismiss();
  }

  closeRegister() {
    this.viewCtrl.dismiss([this.newAddress, this.isEdit]);
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: this.translateService.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  setNewAddress(a) {
    this.newAddress = a
  }
}
