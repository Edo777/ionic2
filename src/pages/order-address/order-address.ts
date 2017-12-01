import { Component } from "@angular/core";
import { NavController, LoadingController, NavParams, AlertController , App} from "ionic-angular";
import { CompleteOrder } from "../barrel";
import { MobiWash } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";


@Component({
    selector:'order-address',
    templateUrl:'order-address.html',
})

export class OrderAddress{
    address: any;
    newOrder: any[];
    myDate:string;
    constructor(
        private nav:NavController,
        public loadingCtrl: LoadingController,
        private navParams:NavParams,
        private mobiWash:MobiWash,
        private alertCtrl:AlertController,
        private serv:TranslateService
    ){}
    ngOnInit(){
        this.presentLoadingDefault();
        this.newOrder = this.navParams.get('newOrder');
        this.historyAddresses = this.mobiWash.getAddresses();
        console.log(this.newOrder);
    }
    presentLoadingDefault() {
        let message = this.serv.translateImportant('Խնդրում ենք սպասել...', "Please wait...")
        let loading = this.loadingCtrl.create({
            content: message
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
    //////////////////////
    historyAddresses:any;
    presentPrompt() {
        let inp = this.historyAddresses;
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
                    console.log(this.address)
                }
            }
        })
        alert.present();
      }
}