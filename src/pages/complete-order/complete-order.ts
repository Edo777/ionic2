import {Component} from "@angular/core";
import {NavController, App} from "ionic-angular";
import {OrdersPage, OrdersList, OrdersHistory} from "../barrel";

@Component({
  selector: 'complete-order',
  templateUrl: 'complete-order.html'
})

export class CompleteOrder {

  constructor(private _nav: NavController, public appCtrl: App) {

  }

  goToStart() {
    this._nav.setRoot(OrdersPage)
  }

  goToOrdersList() {
    this._nav.setPages([{page: OrdersPage}, {page: OrdersList}])
  }

  goToOrdersHistory() {
    this._nav.setPages([{page: OrdersPage}, {page: OrdersHistory}])
  }
}
