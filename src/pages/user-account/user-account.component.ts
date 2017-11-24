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
    ){
        
    }
   ngOnInit(){
       this.getOrder()
   }
   
    createNewOrder() {
        var profileModal = this.modalCtrl.create(OrdersRegister);
        profileModal.onDidDismiss((data)=>{
            if(data){
                let car = {
                    brand:data.brand,
                    model:data.model,
                    number:data.number,
                }
                this.mobiWash.addAddress(data.address);
                this.mobiWash.addCar(car);
                this.mobiWash.addOrder(data);
                this.getOrder();
            }
            console.log('none')
        })
        profileModal.present();
    }

    getOrder(){
         this.orders=this.mobiWash.getOrder()
    }
    removeOrder(i){
        this.mobiWash.removeOrder(i)
        this.orders = this.mobiWash.getOrder()
    }
}