import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, App, NavParams } from 'ionic-angular';
import { OrdersRegister, AddNewAddress, OrdersList, OldOrders, OrdersPage, OrdersHistory } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";
import { MobiWash } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";




@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount {   
    orders:NewOrder[] = [];
    datas:string[] = [];
    pageName:string = "create_order";
    activeLng:any;
    logoPath:string;
    constructor(
        public modalCtrl: ModalController,
        private mobiWash:MobiWash,
        private nav:NavController,
        public appCtrl: App,
        private params:NavParams,
        private translateService:TranslateService
    ){
       
    }
   ngOnInit(){
     //this.logoPath = this.translateService.getActiveLng().lng == 'arm' ? '../assets/imgs/arm.jpg' : '../assets/imgs/en.jpg';
   }
 
   ionViewWillEnter(){
    this.logoPath = this.translateService.getActiveLng().lng == 'arm' ? 'assets/imgs/arm.jpg' : 'assets/imgs/en.jpg';
   }
   ngDoCheck(){
    this.logoPath = this.translateService.getActiveLng().lng == 'arm' ? 'assets/imgs/arm.jpg' : 'assets/imgs/en.jpg';
   }
    createNewOrder() {
       this.nav.push(OrdersList);
    }

    oldOrders(){
        this.nav.push(OrdersHistory, {"archive": "1"})
    }
}