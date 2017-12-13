import { Component, OnInit, NgZone } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { OrdersRegister,  OrderAddress } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";
import { MobiWash } from "../../services/barrel.service";

@Component({
    selector:'orders-list',
    templateUrl:'orders-list.html'
})

export class OrdersList implements OnInit{
    cars:any[] = [];
    editIndex:number;
    isEdit:boolean = false;
    constructor(
        private nav:NavController, 
        private modalCtrl:ModalController, 
        private mobiWash:MobiWash,
        private ngZone:NgZone
    ){

    }
    ngOnInit(){
        this.editIndex = this.cars.length - 1;
    }
    remove(i){
        this.cars.splice(i, 1);
    }
    edit(i){
        this.editIndex = i;
        this.isEdit = true;
        this.createNewAddress(this.cars[i]);
    }
    completeAll(){
        this.ngZone.run(() => {
             this.nav.push(OrderAddress, {'newOrder' : this.cars})
        })
        console.log('hello')
    }
    createNewAddress(orderEdit?:any){
       var modalAddress = orderEdit? this.modalCtrl.create(OrdersRegister, {"orderEdit":orderEdit}) : this.modalCtrl.create(OrdersRegister);
       modalAddress.onWillDismiss((data) => {
           if(data){
               console.log(data.forServer);
               console.log(data.forUser)
                if(this.isEdit){
                    this.cars.splice(this.editIndex, 1 , data.forUser);
                }else{
                    this.cars.push(data.forUser);   
                }
                this.isEdit = false;
           }
       })
        modalAddress.present()
    }
    ngOnDestroy(){
        console.log("delete orders-list")
    }
}