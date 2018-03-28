import { Component, ViewChild } from '@angular/core';
import { NavParams, Tabs } from "ionic-angular";
import { NewOrders, OldOrders } from "./barrel-orders";

@Component({
    selector:"orders-history",
    templateUrl: "orders-history.html"
})

export class OrdersHistory{
     pageName:string;
     active = NewOrders;
     unactive = OldOrders;
     @ViewChild('myTabs') tabRef: Tabs;
    constructor(private navParams: NavParams){
        this.pageName = this.navParams.get('pageName');
    }
    ionViewWillEnter(){
        console.log(this.navParams.data)
        if(this.navParams.get("archive")){
            this.tabRef.select(1);
        }
    }
}
