import { Component } from "@angular/core";
import { NavController, LoadingController, NavParams } from "ionic-angular";
import { CompleteOrder } from "../barrel";
import { MobiWash } from "../../services/barrel.service";

@Component({
    selector:'order-address',
    templateUrl:'order-address.html'
})

export class OrderAddress{
    address: any;
    newOrder: any[];
    
    constructor(
        private nav:NavController,
        public loadingCtrl: LoadingController,
        private navParams:NavParams,
        private mobiWash:MobiWash
    ){}
    ngOnInit(){
        this.presentLoadingDefault();
        this.newOrder = this.navParams.get('newOrder')
        console.log(this.newOrder)
    }
    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'Խնդրում ենք սպասել...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 2000);
    }
    setNewAddress(event){
        this.address = event;
    }
    completeOrder(){
        for(let i of this.newOrder){
            this.mobiWash.addCar({brand:i.brand, model:i.model, number:i.number});
        }
        this.mobiWash.addAddress(this.address)
        this.nav.setRoot(CompleteOrder)
    }
}