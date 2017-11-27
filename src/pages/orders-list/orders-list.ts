import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { OrdersRegister, CompleteOrder } from "../barrel";

@Component({
    selector:'orders-list',
    templateUrl:'orders-list.html'
})

export class OrdersList{
    constructor(private nav:NavController, private modalCtrl:ModalController){

    }
    createNewAddress(){
       var modalAddress=this.modalCtrl.create(OrdersRegister);
       modalAddress.onDidDismiss((data)=>{
           this.nav.push(CompleteOrder)
       })
        modalAddress.present()
    }
}