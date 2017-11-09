import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { NewOrder } from "../pages/interfaces/interfaces";


@Injectable()
export class CompleteTestService {
  labelAttribute = "name";
  orders:NewOrder[] = []

  constructor(private http:Http) {

  }
  removeOrder(i){
    this.orders.splice(i, 1);
  }
  setOrders(data){
    this.orders.unshift(data)
  }
  getOrders(){
    return this.orders;
  }
  getResults() {
    return this.http.get("assets/data.json")
      .map(result =>result.json())  
  }
}