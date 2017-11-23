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
            if(data){
                if(data.brand.length < 1 || data.model.length < 1 || data.number.length < 1){
                return;
            }
            let car = {
                brand:data.brand,
                model:data.model,
                number:data.number,
            }
            this.mobiWash.addAddress(data.address);
            this.mobiWash.addCar(car)
            }
            
        })
        profileModal.present();
    }
}