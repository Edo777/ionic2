import { Component, OnInit } from "@angular/core";
import { ModalController } from 'ionic-angular';
//components
import { OrdersRegister } from "../barrel";
//interfaces
import { NewOrder, LocalGetSet } from "../interfaces/interfaces";
//services
import { OrdersController } from "../../services/cars.service";



@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount implements OnInit{   

    orders:string[] = [];
    pageName:string = 'Պատվերի գրանցում';
    localGetSet:LocalGetSet;

    constructor(
        public modalCtrl: ModalController,
        private ordersCtrl:OrdersController){
            
        }
    ngOnInit(){
        this.orders = this.ordersCtrl.getOrders();
    }
    removeOrder(index){
        this.ordersCtrl.removeOrder(index);
        this.orders = this.ordersCtrl.getOrders();
    }
    createNewOrder() {
        var profileModal = this.modalCtrl.create(OrdersRegister);
        profileModal.onDidDismiss((data)=>{
            let orders:string[] = [];
            this.localGetSet = {
                get:() => {
                    return JSON.parse(localStorage.getItem('orders'));
                },
                set:() => {
                    localStorage.setItem('orders', JSON.stringify(orders));
                }
            }
            orders = this.localGetSet.get() ? this.localGetSet.get() : [data];

            //if empty set the data else [get item and push data] after then setItem
            if(!localStorage.getItem('orders')){
                this.localGetSet.set();
            }else{
                orders.push(data);
                this.localGetSet.set();
            }  
            this.orders = this.ordersCtrl.getOrders();       
        })
         profileModal.present();
    }


}