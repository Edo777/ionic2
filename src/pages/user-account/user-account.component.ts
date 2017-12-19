import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, App, NavParams } from 'ionic-angular';
import { OrdersRegister, AddNewAddress, OrdersList, OldOrders, OrdersPage, OrdersHistory } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";
import { MobiWash } from "../../services/barrel.service";




@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount {   
    orders:NewOrder[] = [];
    datas:string[] = [];
    pageName:string = 'Պատվերի գրանցում';

    constructor(
        public modalCtrl: ModalController,
        private mobiWash:MobiWash,
        private nav:NavController,
        public appCtrl: App,
        private params:NavParams
    ){
       
    }
   ngOnInit(){
      // this.getOrder()
   }
 
   
    createNewOrder() {
       this.nav.push(OrdersList);
    }

    getOrder(){
       //  this.orders=this.mobiWash.getOrder()
    }
    removeOrder(i){
        this.mobiWash.removeOrder(i)
      //  this.orders = this.mobiWash.getOrder()
    }
    oldOrders(){
        this.nav.push(OrdersHistory, {"archive": "1"})
    }
}