import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'


@Injectable()
export class OrdersController {
  labelAttribute = "name";
  orders:string[] = []

  constructor(private http:Http) {

  }
  private ordersInit(){
    this.orders = JSON.parse(localStorage.getItem('orders'));
  }
  removeOrder(i){
    let orders:string[] = JSON.parse(localStorage.getItem('orders'));
    orders.splice(i, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    this.ordersInit();
  }
  getOrders(){
    this.ordersInit();
    return this.orders;
  }
  getResults() {
    return this.http.get("assets/data.json")
      .map(result => result.json())  
  }
}