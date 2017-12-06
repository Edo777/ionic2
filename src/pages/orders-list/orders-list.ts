import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { OrdersRegister,  OrderAddress } from "../barrel";
import { NewOrder } from "../interfaces/interfaces";
import { MobiWash } from "../../services/barrel.service";

@Component({
    selector:'orders-list',
    templateUrl:'orders-list.html'
})

export class OrdersList implements OnInit{
    newOrder:any[] = [];
    editIndex:number;
    isEdit:boolean = false;
    constructor(
        private nav:NavController, 
        private modalCtrl:ModalController, 
        private mobiWash:MobiWash
    ){}
    ngOnInit(){
        this.editIndex = this.newOrder.length - 1;
    }
    remove(i){
        this.newOrder.splice(i, 1);
    }
    edit(i){
        this.editIndex = i;
        this.isEdit = true;
        this.createNewAddress(this.newOrder[i]);
    }
    completeAll(){
       this.nav.push(OrderAddress, {'newOrder' : this.newOrder})
       console.log('hello')
    }
    createNewAddress(orderEdit?:any){
       var modalAddress=this.modalCtrl.create(OrdersRegister, {"orderEdit":orderEdit});
       modalAddress.onWillDismiss((data) => {
           if(data){
                if(this.isEdit){
                    this.newOrder.splice(this.editIndex, 1 , data);
                }else{
                    this.newOrder.push(data);   
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