import { Component } from "@angular/core";
import { ModalController } from 'ionic-angular';
import { OrdersRegister } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";



@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount{   
    orders:NewOrder[] = [];
    
    pageName:string = 'Իմ մեքենաները';

    constructor(public modalCtrl: ModalController){
        
    }

    createNewOrder() {
        var profileModal = this.modalCtrl.create(OrdersRegister);
        profileModal.onDidDismiss((data)=>{
            this.orders.unshift(data);
        })
         profileModal.present();
    }


}