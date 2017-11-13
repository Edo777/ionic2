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
    oldcars:string[] = []
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
            let oldcars:string[] = [];

            this.localGetSet = {
                get:(str:string) => {
                    return JSON.parse(localStorage.getItem(str));
                },
                set:(str:string, which:any) => {
                    localStorage.setItem(str, JSON.stringify(which));
                }
            }

            orders = this.localGetSet.get('orders') ? this.localGetSet.get('orders') : [data.NEWORDER];
            oldcars = this.localGetSet.get('oldcars') ? this.localGetSet.get('oldcars') : [data.OLDCAR];

            //if empty set the data else [get item and push data] after then setItem
            if(!localStorage.getItem('orders')){
                this.localGetSet.set('orders', orders);
                
            }else{
                orders.push(data.NEWORDER);
                this.localGetSet.set('orders', orders);
            }
            //set old car history
            if(!localStorage.getItem('oldcars')){
                this.localGetSet.set('oldcars', oldcars)
            }
            else{
                let isFirstCar = true;
                oldcars.map((i:any)=>{
                    if(i.brand == data.OLDCAR.brand && i.model == data.OLDCAR.model){
                        return isFirstCar = false;
                    }
                })
                if(isFirstCar){
                    oldcars.push(data.OLDCAR);
                    this.localGetSet.set('oldcars', oldcars)
                }                 
            }  
            this.orders = this.ordersCtrl.getOrders();  
        })
         profileModal.present();
    }


}