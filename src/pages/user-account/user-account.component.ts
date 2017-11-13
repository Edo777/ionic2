import { Component, OnInit } from "@angular/core";
import { ModalController } from 'ionic-angular';
import { OrdersRegister } from "../barrel";
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
        private mobiWash:MobiWash
    ){}

   
    createNewOrder() {
        var profileModal = this.modalCtrl.create(OrdersRegister);
        profileModal.onDidDismiss((data)=>{
            this.mobiWash.addCar(data)
        })
        profileModal.present();
    }


}