import { Component } from "@angular/core";
import { ModalController } from 'ionic-angular';
import { OrdersRegister } from "../barrel";


/*
    interface Car{
        number:string;
        model:string;
        sedan:string;
    }
*/

@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount{   
    //newCar:Car[];
    
    pageName:string = 'Իմ մեքենաները';

    constructor(public modalCtrl: ModalController){
        
    }

    createNewOrder() {
        let profileModal = this.modalCtrl.create(OrdersRegister);
         profileModal.present();
    }


}