import {Component} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {NavParams, NavController, App, LoadingController, ModalController} from "ionic-angular";
import {OrdersList, OrderInfo} from '../../barrel';
import {TranslateService} from '../../../translate/translate.service';


@Component({
  selector: "old-orders",
  templateUrl: "old-orders.html"
})

export class OldOrders {
  data: any[];
  isHeader = true;
  private NAV: any;

  constructor(private api: ApiService,
              private params: NavParams,
              private nav: NavController,
              private app: App,
              private serv: TranslateService,
              private loadingCtrl: LoadingController,
              private modal: ModalController) {
    this.NAV = nav;
    if (this.NAV.tabTitle) {
      this.isHeader = false;
    }
  }

  ngAfterViewInit() {

  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: this.serv.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
    });
    this.api.getOrders("archive").subscribe(data => {
      this.data = data;
      loading.dismiss()
    }, error => {
      loading.dismiss()
    })
  }

  copy(item) {
    let cars = [];
    for (let i = 0; i < item.cars.length; i++) {

      let currentCar = {
        make_id: item.cars[i].car_make,
        model_id: item.cars[i].car_model,
        car_number: item.cars[i].car_number,
        service: item.cars[i].service_id,
        type: "new"
      }
      if (!item.cars[i].type) {
        delete currentCar.type
      }
      cars.push(currentCar);
    }

    (this.app.getActiveNav().parent).parent.push(OrdersList, {"cars": cars})
  }

  updateOrder(item, status: string, i?) {
    let loading = this.loadingCtrl.create({
      content: this.serv.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
    });
    loading.present();

    this.api.updateOrder(item, status).subscribe(
      (data) => {
        this.data.splice(i, 1);
        loading.dismiss()
      },
      (err) => {
        loading.dismiss()
      }
    )
  }

  more(info) {
    var modal = this.modal.create(OrderInfo, {"info": info});
    modal.present()
  }
}
