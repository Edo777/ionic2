import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { ToastController, LoadingController, InfiniteScroll, Platform, NavController, App } from "ionic-angular";
import { TranslateService } from "../../../translate/translate.service";
import { OrdersRegister, OrdersList } from "../../barrel";


@Component({
    selector:"new-orders",
    templateUrl: "new-orders.html"
})

export class NewOrders{

    data = [];
    data2 = [];
    viewHeight:number;
    isComnplete:boolean = true;;
    constructor(
        private api:ApiService,
        private toastCtrl:ToastController,
        private serv:TranslateService,
        private loadingCtrl:LoadingController,
        private platform: Platform,
        private navCtrl:NavController,
        private app:App

    ){
        this.viewHeight = platform.height();
        let loading;
        setTimeout(() => {
            loading = this.loadingCtrl.create({
                content: this.serv.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
            });
            loading.present();
        })
        
                 
        this.api.getOrders("active").subscribe(
                (data)=>{
                    console.log(data)
                    this.data = data;
                    
                    this.viewHeight = Math.floor(this.viewHeight/100)
                    console.log(this.viewHeight)
                    if(this.viewHeight > this.data.length){
                       for(let i = 0; i < this.data.length; i++){
                            this.data2.push(this.data[i])
                        }
                    }else{
                        for(let i = 0; i < this.viewHeight; i++){
                         this.data2.push(this.data[i])
                        }
                    }
                    
                    loading.dismiss()
                },(error)=>{
                    loading.dismiss()
                })   
                          
         }
         
         doInfinite(infiniteScroll: InfiniteScroll) {
             setTimeout(() => {
                 let currentLength = this.data2.length;
                 let loadingLength = currentLength + this.viewHeight;
                 if(loadingLength > this.data.length){
                    loadingLength = this.data.length;
                 }
                this.api.getOrders("active").subscribe((data) => {
                    
                    for ( let i = currentLength; i < loadingLength; i++) {
                        this.data2.push( this.data[i] );
                    }

                    infiniteScroll.complete();
                 });
             }, 2000)
        }

        copy(item){
            
            console.log(item.cars);
            
            for(let i = 0; i < item.cars.length; i++){
                let currentCar = {
                    make_id:item.cars[i].car_make,
                    model_id:item.cars[i].car_model,
                    car_number:item.cars[i].car_number,
                    service:item.cars[i].service_id,
                    type:'new'
                }
                item.cars[i] = currentCar;
            }
            
            (this.app.getActiveNav().parent).parent.push(OrdersList,{"cars" : item.cars})
            
        }


     some(item, i){
         this.data.splice(i, 1);
         item.close()
     }
    
      
}
