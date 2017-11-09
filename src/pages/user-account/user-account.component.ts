import { Component, OnInit } from "@angular/core";
import { ModalController } from 'ionic-angular';
import { OrdersRegister } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";
import { CompleteTestService } from "../../services/cars.service";



@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount implements OnInit{   
    orders:NewOrder[] = [];
    
    pageName:string = 'Իմ մեքենաները';

    constructor(
        public modalCtrl: ModalController,
        private completeTestService:CompleteTestService){}

    ngOnInit(){
        this.orders = this.completeTestService.getOrders();
    }
    removeOrder(index){
        this.completeTestService.removeOrder(index);
    }
    createNewOrder() {
        var profileModal = this.modalCtrl.create(OrdersRegister);
        profileModal.onDidDismiss((data)=>{
            this.completeTestService.setOrders(data);
        })
         profileModal.present();
    }


}