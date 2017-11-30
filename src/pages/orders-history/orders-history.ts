import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import {  NewOrders, OldOrders } from "./barrel-orders";

@Component({
    selector:"orders-history",
    templateUrl: "orders-history.html"
})

export class OrdersHistory{
     pageName:string;
     active = NewOrders;
     unactive = OldOrders;
    constructor(private navParams: NavParams){
        this.pageName = this.navParams.get('pageName');
    }
}
