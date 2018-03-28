import {Component} from '@angular/core';
import {NavParams, ModalController, ViewController, AlertController} from "ionic-angular";
import {MobiWash} from "../../services/barrel.service";
import {AddNewAddress} from "../barrel";
import {TranslateService} from '../../translate/translate.service';

@Component({
  selector: 'addresses',
  templateUrl: 'addresses.html',
})

export class Addresses {
  pageName: string;
  addresses: string[];

  constructor(private navParams: NavParams,
              private mobiwash: MobiWash,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private serv: TranslateService) {
    this.pageName = this.navParams.get('pageName');
  }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses() {
    this.addresses = this.mobiwash.getAddresses();
  }

  removeAddress(i) {
    this.mobiwash.removeAddress(i);
    this.addresses = this.mobiwash.getAddresses()
  }

  deleteConfirm(i, item) {
    let alert = this.alertCtrl.create({
      message: this.serv.translateImportant("Դուք վստա՞հ եք", "Are you sure?"),
      buttons: [
        {
          text: this.serv.translateImportant("Ոչ", "No"),
          role: 'Cancel',
          handler: () => {
            item.close()
          }
        },
        {
          text: this.serv.translateImportant("Այո", "Yes"),
          handler: () => {
            this.removeAddress(i);
          }
        }
      ]
    });
    alert.present();
  }

  createNewAddress(address?: any, index?: number) {
    var modalAddress;
    if (address) {
      modalAddress = this.modalCtrl.create(AddNewAddress, {"address": address});
    } else {
      modalAddress = this.modalCtrl.create(AddNewAddress);
    }

    modalAddress.onWillDismiss((data) => {
      if (data) {
        if (data[1]) {
          this.mobiwash.editAddress(index, data[0]);
          this.addresses = this.mobiwash.getAddresses();
        } else {
          this.mobiwash.addAddress(data[0]);
          this.addresses = this.mobiwash.getAddresses();
        }

      }
    })
    modalAddress.present()

  }

  //loading

}
