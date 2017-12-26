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
     
   }
 
   
    createNewOrder() {
       this.nav.push(OrdersList);
    }

    oldOrders(){
        this.nav.push(OrdersHistory, {"archive": "1"})
    }
}