import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { OrdersRegister,  OrderAddress } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";
import { MobiWash } from "../../services/barrel.service";

@Component({
    selector:'orders-list',
    templateUrl:'orders-list.html'
})

export class OrdersList implements OnInit{
    newOrder:any[] = [];
    constructor(
        private nav:NavController, 
        private modalCtrl:ModalController, 
        private mobiWash:MobiWash
    ){}
    ngOnInit(){
        
    }
    completeAll(){
       this.nav.push(OrderAddress, {'newOrder' : this.newOrder})
    }
    createNewAddress(){
       var modalAddress=this.modalCtrl.create(OrdersRegister);
       modalAddress.onDidDismiss((data)=>{
           if(data){
               this.newOrder.push(data)
               console.log(this.newOrder)
           }
       })
        modalAddress.present()
    }
}