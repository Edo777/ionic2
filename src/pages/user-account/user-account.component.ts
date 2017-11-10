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
    datas:string[] = [];
    pageName:string = 'Իմ մեքենաները';

    constructor(
        public modalCtrl: ModalController,
        private completeTestService:CompleteTestService){}

    ngOnInit(){
        //this.orders = this.completeTestService.getOrders();
        if(localStorage.getItem('orders')){
            this.datas = JSON.parse(localStorage.getItem('orders'));
        }
    }
    removeOrder(index){
        //this.completeTestService.removeOrder(index);
    }
    createNewOrder() {
        var profileModal = this.modalCtrl.create(OrdersRegister);
        profileModal.onDidDismiss((data)=>{
            //this.completeTestService.setOrder(data);
            this.datas.push(data);
            if(!localStorage.getItem('orders')){
                localStorage.setItem('orders', JSON.stringify(this.datas));
            }else{
                console.log(typeof(localStorage.getItem('orders')));
                localStorage.setItem('orders', JSON.stringify(this.datas))
            }         
        })
         profileModal.present();
    }


}