import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {MobiWash, CarsService} from "../../services/barrel.service";
import {ModalController, AlertController} from 'ionic-angular';
import {AddCars} from "../barrel";
import {TranslateService} from '../../translate/translate.service';


@Component({
  selector: 'history-page',
  templateUrl: 'history.html',

})
export class HistoryPage implements OnInit {

  //models

  pageName: string;
  cars: any[] = [];
  addNewCar: any = {};
  isAddNewCar: boolean = false;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private mobiWash: MobiWash,
              private carsCtrl: CarsService,
              private alertCtrl: AlertController,
              private serv: TranslateService) {
  }

  ngOnInit() {
    this.pageName = this.navParams.get('pageName');
    this.cars = this.mobiWash.getCars();
  }

  //alert delete
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
            this.removeCar(i);
          }
        }
      ]
    });
    alert.present();
  }

  removeCar(i) {
    this.mobiWash.removeCar(i);
    this.cars = this.mobiWash.getCars()
  }

  addCar() {
    this.mobiWash.addCar(this.addNewCar);
    this.cars = this.mobiWash.getCars()
  }


  createNewCars(car?: any, index?: number) {
    var modal = this.modalCtrl.create(AddCars, {"car": car});
    modal.onWillDismiss((data) => {
      if (data) {
        if (data[1]) {
          this.mobiWash.editCar(index, data[0])
          this.cars = this.mobiWash.getCars();

        } else {
          this.addNewCar = data[0];
          this.addCar();
        }
      }
    })
    modal.present();
  }
}
