import {Component, OnInit, NgZone} from "@angular/core";
import {NavController, ModalController, AlertController, NavParams} from "ionic-angular";
import {CarsService} from "../../services/cars.service";
import {OrdersRegister, OrderAddress} from "../barrel";
import {MobiWash} from "../../services/barrel.service";
import {TranslateService} from "../../translate/translate.service";

@Component({
  selector: 'orders-list',
  templateUrl: 'orders-list.html'
})

export class OrdersList implements OnInit {
  cars: any[] = [];
  editIndex: number;
  isEdit: boolean = false;

  constructor(private nav: NavController,
              private modalCtrl: ModalController,
              private mobiWash: MobiWash,
              private ngZone: NgZone,
              private carService: CarsService,
              private alertCtrl: AlertController,
              private params: NavParams,
              private serv: TranslateService) {

  }

  ngOnInit() {
    this.editIndex = this.cars.length - 1;
    this.whenHasData();
  }

  whenHasData() {
    this.ngZone.run(() => {
      if (this.params.data["cars"]) {
        this.cars = this.params.data["cars"];
      }

    })

  }

  remove(i) {
    this.cars.splice(i, 1);
  }

  edit(i) {
    this.editIndex = i;
    this.isEdit = true;
    this.createNewOrder(this.cars[i]);
  }

  completeAll() {
    this.ngZone.run(() => {
      this.nav.push(OrderAddress, {"cars": this.cars})
    })
  }

  createNewOrder(orderEdit?: any) {
    var modalAddress = orderEdit ? this.modalCtrl.create(OrdersRegister, {"orderEdit": orderEdit}) : this.modalCtrl.create(OrdersRegister);
    modalAddress.onWillDismiss((data) => {
      if (data) {
        if (this.isEdit) {
          this.cars.splice(this.editIndex, 1, data);
        } else {
          this.cars.push(data);
        }
        this.isEdit = false;
      }
    })
    modalAddress.present()
  }

  deleteConfirm(i, item) {
    let alert = this.alertCtrl.create({
      message: this.serv.translateImportant('Դուք վստա՞հ եք', "Are you sure?"),
      buttons: [
        {
          text: this.serv.translateImportant('Ոչ', "No"),
          role: 'Cancel',
          handler: () => {
            item.close()
          }
        },
        {
          text: this.serv.translateImportant('Այո', "Yes"),
          handler: () => {
            this.remove(i);
          }
        }
      ]
    });
    alert.present();
  }
}
