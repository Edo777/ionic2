import { Component } from "@angular/core";
import { NavController, LoadingController, NavParams, AlertController } from "ionic-angular";
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
        private mobiWash:MobiWash,
        private alertCtrl:AlertController
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
    presentPrompt() {
        let inp = this.mobiWash.getAddresses();
        let alert = this.alertCtrl.create();
        for(let i = 0; i < inp.length; i++){
            alert.addInput({
                type:'radio',
                value:inp[i],
                label:inp[i].address
            })
        }
        alert.addButton({
            text: 'Ok',
            handler:(data) => {
                if(data){
                    this.address = data;
                }
            }
        })
        alert.present();
      }
}