import { Component } from "@angular/core";
import { NavController, LoadingController, NavParams, AlertController, App, Platform, ToastController } from "ionic-angular";
import { CompleteOrder } from "../barrel";
import { MobiWash } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";
import { ApiService } from "../../services/api.service";


@Component({
    selector:'order-address',
    templateUrl:'order-address.html',
})

export class OrderAddress{
    simple:any = {
            customer_id:"71",
            customer_phone:"1145747",
            promo_code:123456,
            date:"2017-11-28 16:00:00",
            asap:0,
            address:{
                lat:165465465465,
                long:456865446.54,
                address:"Sayat lova"
            },
            cars:[
                {
                    car_number:"23AD658",
                    service:2,
                    make_id:1,
                    model_id:12
                },
                {
                    car_number:"23AD658",
                    service:2,
                    make_id:1,
                    model_id:12
                },
                {
                    car_number:"23AD658",
                    service:2,
                    make_id:"opel",
                    model_id:"vectra",
                    type:"new"
                }
            ]  
        };

    fast:boolean = false;
    address: any;
    cars:any;
    myDate:string;
    promo_code:number;
    mapAddClassHide:boolean = false;
    constructor(
        private nav:NavController,
        public loadingCtrl: LoadingController,
        private navParams:NavParams,
        private mobiWash:MobiWash,
        private alertCtrl:AlertController,
        private serv:TranslateService,
        private api:ApiService,
        private toastCtrl:ToastController
    ){}
    ngOnInit(){
        this.presentLoadingDefault();
        
        this.cars = this.navParams.get("cars");
        console.log(this.cars)
        this.historyAddresses = this.mobiWash.getAddresses();
        
    }

    presentLoadingDefault() {
        let message = this.serv.translateImportant('Խնդրում ենք սպասել...', "Please wait...")
        let loading = this.loadingCtrl.create({
            content: message
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 3000);
    }
    setNewAddress(event){
        this.address = event;
    }
    completeOrder(){
        
        this.simple["customer_id"] = this.api.getId()
        this.simple["customer_phone"] = this.api.getPhoneNumber()
        this.simple["promo_code"] = this.promo_code;
        this.simple["date"] = this.myDate;
        this.simple["address"] = this.address;
        this.simple["cars"] = this.cars;
        this.simple["asap"] = Number(this.fast);
        console.log(this.simple);
        
        let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: this.serv.translateImportant("Պատվերն ուղարկվում է․․․", 'The order is sent ...')
          });
          loading.present();

        
        
        this.api.sendOrder(this.simple).subscribe(
            (data)=>{
                console.log(data)
                if(data["status"] == "success"){
                    // LocalStorage setters 
                    this.mobiWash.addAddress(this.simple.address);

                    this.mobiWash.addCar(this.addCarsFromLocalstorage(this.simple.cars));
                    console.log(this.simple);
                    loading.dismiss()
                    this.nav.setRoot(CompleteOrder)
                }else{
                    loading.dismiss()
                }
        },
        (error)=>{
            this.showToast(error);
            loading.dismiss()
            console.log(this.simple)
        }
        )
    
        
        
        
       
    }

    private addCarsFromLocalstorage(arr){
        let carsFromLocal = []
        for(let i = 0; i < arr.length; i++){
            delete arr[i].service
            carsFromLocal.push(arr[i])
        }
        return carsFromLocal;
    }

    showToast(err) {
        let toast = this.toastCtrl.create({
        message: `${err}`,
        duration: 2000,
        position: "top"
        });

        toast.present(toast);
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

    ngOnDestroy(){
        console.log(this.address, "delete order address")
    }
}